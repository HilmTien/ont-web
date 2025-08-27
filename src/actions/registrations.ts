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

  const session = await auth();

  if (!session || !session.osuId) {
    return { error: "Login" };
  }

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("osu_id", session.osuId)
    .single();

  if (!user) {
    return { error: "User not found in database" };
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

  const { data: newRegistration } = await supabase
    .from("registrations")
    .insert({
      user_id: user.id,
      tournament_id: data.tournament_id,
      registered_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (!newRegistration) {
    return { error: "Registration failed" };
  }

  revalidatePath(`/tournament/${data.tournament_id}`);

  return newRegistration;
}

export async function removeRegistration(
  userId: number,
  tournamentId: number,
): ServerActionResponse<Tables<"registrations">> {
  const supabase = await createServerClient();

  const { data: user } = await supabase
    .from("registrations")
    .delete()
    .eq("user_id", userId)
    .select()
    .single();

  if (!user) {
    return { error: "Cannot remove registration" };
  }

  revalidatePath(`/admin/tournament/${tournamentId}`);

  return user;
}
