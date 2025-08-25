import { Database } from "@/generated/database.types";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

interface MappoolParams {
  tourneyId: number;
  stageIndex: number;
}

export async function getMappool(
  supabase: SupabaseClient<Database>,
  params: MappoolParams,
) {
  return supabase
    .from("tournament_stages")
    .select(
      `
      is_public,
      mappool_maps(
        map_index,
        mods,
        beatmaps(
          *
        )
      ),
      tournaments(
        id
      )
    `,
    )
    .eq("tournaments.id", params.tourneyId)
    .eq("stage_index", params.stageIndex)
    .single();
}

export type MappoolData = QueryData<ReturnType<typeof getMappool>>;
