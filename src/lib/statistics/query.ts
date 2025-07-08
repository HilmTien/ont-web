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
    .from("tournaments")
    .select(
      `
        tournament_stages(
          is_public,
          mappool_maps(
            map_index,
            beatmaps(
              *
            ),
            scores(
              team_players(
                users(
                  *
                )
              ),
              score
            )
          )
        )
        `,
    )
    .eq("id", params.id)
    .eq("tournament_stages.stage_index", params.stageIndex)
    .single();
}

export type StatisticsQueryData = QueryData<ReturnType<typeof getStatistics>>;
