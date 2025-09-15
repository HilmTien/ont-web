import { Database } from "@/generated/database.types";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

export async function getStagesSelector(supabase: SupabaseClient<Database>) {
  return supabase
    .from("tournament_stages")
    .select("stage_name")
    .eq("tournament_id", 1)
    .order("stage_index");
}

export type StagesData = QueryData<ReturnType<typeof getStagesSelector>>;
