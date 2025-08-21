import { PublicMatchesInsert } from "@/generated/zod-schema-types";
import { createServerClient } from "@/lib/server";

export async function createMatch(match: PublicMatchesInsert) {
  const supabase = await createServerClient();

  supabase.from("matches").insert(match);
}
