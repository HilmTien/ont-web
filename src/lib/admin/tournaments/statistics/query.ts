import { Database } from "@/generated/database.types";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

interface QueryParams {
  tournamentId: number;
}

export default async function getStagesScores(
  supabase: SupabaseClient<Database>,
  params: QueryParams,
) {
  return supabase
    .from("tournament_stages")
    .select(
      `
      id,
      stage_name,
      stage_index,
      matches(
        team1:teams!team1_id(
          team_players(
            id,
            users(osu_id)
          )
        ),
        team2:teams!team2_id(
          team_players(
            id,
            users(osu_id)
          )
        ),
        mp_id
      ),
      mappool_maps(
        id,
        map_index,
        beatmaps(
          osu_id
        )
      ),
      tournaments(
        id
      )
    `,
    )
    .eq("tournaments.id", params.tournamentId);
}

export type StagesScoresData = QueryData<ReturnType<typeof getStagesScores>>;
