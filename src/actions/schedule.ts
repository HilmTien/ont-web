"use server";

import {
  PublicMatchesInsert,
  PublicMatchesUpdate,
} from "@/generated/zod-schema-types";
import { createServerClient } from "@/lib/server";

export async function createMatch(match: PublicMatchesInsert) {
  const supabase = await createServerClient();

  await supabase.from("matches").insert(match);
}

export async function editMatch(match: PublicMatchesUpdate, id: number) {
  const supabase = await createServerClient();

  await supabase.from("matches").update(match).eq("id", id);
}
