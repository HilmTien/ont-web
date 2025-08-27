"use server";

import { Tables } from "@/generated/database.types";
import {
  PublicMatchesInsert,
  PublicMatchesRow,
  PublicMatchesUpdate,
} from "@/generated/zod-schema-types";
import { ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";
import { revalidatePath } from "next/cache";

export async function createMatch(
  match: PublicMatchesInsert,
): ServerActionResponse<Tables<"matches">> {
  const supabase = await createServerClient();

  const { data: insertedMatch, error } = await supabase
    .from("matches")
    .insert(match)
    .select()
    .single();

  if (!insertedMatch) {
    await supabase.from("errors").insert(error);

    return { error: "Could not insert match" };
  }

  revalidatePath(`/admin/tournaments/${match.tournament_id}/schedule`);

  return insertedMatch;
}

export async function editMatch(
  match: PublicMatchesUpdate,
  id: number,
): ServerActionResponse<Tables<"matches">> {
  const supabase = await createServerClient();

  const { data: updatedMatch, error } = await supabase
    .from("matches")
    .update(match)
    .eq("id", id)
    .select()
    .single();

  if (!updatedMatch) {
    await supabase.from("errors").insert(error);

    return { error: "Could not insert match" };
  }

  return updatedMatch;
}

export async function deleteMatch(
  match: PublicMatchesRow,
): ServerActionResponse<Tables<"matches">> {
  const supabase = await createServerClient();

  const { data: deletedMatch, error } = await supabase
    .from("matches")
    .delete()
    .eq("id", match.id)
    .select()
    .single();

  if (!deletedMatch) {
    await supabase.from("errors").insert(error);

    return { error: "Could not delete match" };
  }

  revalidatePath(`/admin/tournaments/${match.tournament_id}/schedule`);

  return deletedMatch;
}
