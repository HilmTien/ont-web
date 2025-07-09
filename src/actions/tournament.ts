"use server";

import { PublicTournamentsInsert } from "@/generated/zod-schema-types";
import { createServerClient } from "@/lib/server";

export async function createTournament(data: PublicTournamentsInsert) {
  const supabase = await createServerClient();

  await supabase.from("tournaments").insert(data);
}
