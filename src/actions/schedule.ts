import { PublicMatchesInsertSchema } from "@/generated/zod-schema-types";
import { createServerClient } from "@/lib/server";

export async function createMatch(match: PublicMatchesInsertSchema) {
  const supabase = await createServerClient();

  supabase.from("matches").insert(match);
}
