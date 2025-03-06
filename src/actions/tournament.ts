"use server";

import { Database } from "@/generated/database.types";
import { createServerClient } from "@/lib/server";

export async function createTournament(
  tournament_data: Database["public"]["Tables"]["tournaments"]["Insert"],
) {
  const supabase = await createServerClient();

  await supabase.from("tournaments").insert(tournament_data);
}
