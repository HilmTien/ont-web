"use server";
import { auth } from "@/auth";
import { Tables } from "@/generated/database.types";
import { PublicRegistrationsInsert } from "@/generated/zod-schema-types";
import { ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";
import { revalidatePath } from "next/cache";

export async function createRegistration(
  data: Omit<PublicRegistrationsInsert, "registered_at" | "user_id">,
): ServerActionResponse<Tables<"registrations">> {
  const supabase = await createServerClient();

  const { data: tournament, error: canRegisterError } = await supabase
    .from("tournaments")
    .select("can_register")
    .eq("id", data.tournament_id)
    .single();

  if (!tournament) {
    await supabase.from("errors").insert(canRegisterError);

    return { error: "Tournament not found in database" };
  }

  if (!tournament.can_register) return { error: "Registrations are not open" };

  const session = await auth();

  if (!session || !session.osuId) {
    return { error: "Not logged in" };
  }

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, country_code, is_restricted")
    .eq("osu_id", session.osuId)
    .single();

  if (userError) {
    await supabase.from("errors").insert(userError);
  }

  if (!user) {
    return { error: "User not found in database" };
  }

  if (user.country_code != "NO") {
    return { error: "User is not from Norway" };
  }

  if (user.is_restricted) {
    return { error: "User is restricted" };
  }

  const { data: existingRegistration } = await supabase
    .from("registrations")
    .select()
    .eq("user_id", user.id)
    .eq("tournament_id", data.tournament_id)
    .single();

  if (existingRegistration) {
    return { error: "Already registered" };
  }

  const { data: newRegistration, error: registrationError } = await supabase
    .from("registrations")
    .insert({
      user_id: user.id,
      tournament_id: data.tournament_id,
      registered_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (!newRegistration) {
    await supabase.from("errors").insert(registrationError);

    return { error: "Registration failed" };
  }

  revalidatePath("/players");
  revalidatePath(`/admin/tournaments/${data.tournament_id}/players`);

  return newRegistration;
}

export async function removeRegistration(
  userId: number,
  tournamentId: number,
): ServerActionResponse<Tables<"registrations">> {
  const supabase = await createServerClient();

  const { data: user, error } = await supabase
    .from("registrations")
    .delete()
    .eq("user_id", userId)
    .select()
    .single();

  if (!user) {
    await supabase.from("errors").insert(error);

    return { error: "Cannot remove registration" };
  }

  revalidatePath("/players");
  revalidatePath(`/admin/tournament/${tournamentId}`);

  return user;
}
