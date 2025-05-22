"use server";

import { PublicTournamentsInsertSchema } from "@/generated/zod-schema-types";
import { createServerClient } from "@/lib/server";

export async function createTournament(data: PublicTournamentsInsertSchema) {
  const supabase = await createServerClient();

  await supabase.from("tournaments").insert(data);
}
