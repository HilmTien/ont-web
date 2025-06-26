"use server";
import { PublicRegistrationsInsertSchema } from "@/generated/zod-schema-types";
import { createServerClient } from "@/lib/server";
import { auth } from "@/auth";

export async function createRegistration(
  data: Omit<PublicRegistrationsInsertSchema, "registered_at" | "user_id">,
) {
  const supabase = await createServerClient();

  const session = await auth();

  if (!session || !session.osuId) {
    throw new Error("Log in first");
  }

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("osu_id", session.osuId)
    .single();

  if (!user) {
    throw new Error("User not found in database");
  }

  const { data: existingRegistration } = await supabase
    .from("registrations")
    .select()
    .eq("user_id", user.id)
    .eq("tournament_id", data.tournament_id)
    .single();

  if (existingRegistration) {
    throw new Error("Already registered");
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

  return newRegistration;
}
