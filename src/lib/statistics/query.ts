import { Database } from "@/generated/database.types";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

interface QueryParams {
  id: number;
  stageIndex: number;
}

export async function getStatistics(
  supabase: SupabaseClient<Database>,
  params: QueryParams,
) {
  return supabase
    .from("tournament_stages")
    .select(
      `
        tournaments(
          id
        ),
        is_public,
        mappool_maps(
          map_index,
          mods,
          beatmaps(
            *
          ),
          scores(
            team_players(
              users(
                *
              )
            ),
            score,
            mods
          )
        )
      `,
    )
    .eq("tournaments.id", params.id)
    .eq("stage_index", params.stageIndex)
    .single();
}

export type StatisticsQueryData = QueryData<ReturnType<typeof getStatistics>>;
