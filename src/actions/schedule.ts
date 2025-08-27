"use server";

import {
  PublicMatchesInsert,
  PublicMatchesUpdate,
} from "@/generated/zod-schema-types";
import { createServerClient } from "@/lib/server";
import { revalidatePath } from "next/cache";

export async function createMatch(match: PublicMatchesInsert) {
  const supabase = await createServerClient();

  await supabase.from("matches").insert(match);

  revalidatePath(`/admin/tournaments/${match.tournament_id}/schedule`);
}

export async function editMatch(match: PublicMatchesUpdate, id: number) {
  const supabase = await createServerClient();

  await supabase.from("matches").update(match).eq("id", id);
}

export async function deleteMatch(id: number) {
  const supabase = await createServerClient();

  await supabase.from("matches").delete().eq("id", id);
}
