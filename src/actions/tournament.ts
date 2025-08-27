"use server";

import { Tables } from "@/generated/database.types";
import { PublicTournamentsInsert } from "@/generated/zod-schema-types";
import { ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";

export async function createTournament(
  data: PublicTournamentsInsert,
): ServerActionResponse<Tables<"tournaments">> {
  const supabase = await createServerClient();

  const { data: insertedTournament } = await supabase
    .from("tournaments")
    .insert(data)
    .select()
    .single();

  if (!insertedTournament) {
    return { error: "Could not insert tournament" };
  }

  return insertedTournament;
}
