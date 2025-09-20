import { Database } from "@/generated/database.types";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

interface PublicStagesParams {
  tournamentId: number;
}

export async function getPublicStages(
  supabase: SupabaseClient<Database>,
  params: PublicStagesParams,
) {
  return supabase
    .from("tournament_stages")
    .select(
      `
      id,
      is_public,
      stage_name,
      best_of,
      mappool_maps(
        id,
        map_index,
        mods,
        beatmaps(
          *
        )
      ),
      matches(
        id,
        tournament_match_id,
        team1_label,
        team2_label,
        team1:teams!team1_id(
          id,
          name,
          team_players(
            users(
              id,
              username,
              osu_id,
              rank
            )
          )
        ),

        team2:teams!team2_id(
          id,
          name,
          team_players(
            users(
              id,
              username,
              osu_id,
              rank
            )
          )
        ),

        streamers(
          users(
            username,
            osu_id
          )
        )
      ),
      tournaments(
        id
      )
    `,
    )
    .eq("tournaments.id", params.tournamentId)
    .eq("is_public", true);
}

export type PublicStagesData = QueryData<ReturnType<typeof getPublicStages>>;
