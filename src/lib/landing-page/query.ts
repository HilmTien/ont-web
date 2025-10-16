import { Database } from "@/generated/database.types";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

export async function getLandingPageMatches(
  supabase: SupabaseClient<Database>,
) {
  return supabase.from("matches").select(
    `
      tournament_match_id,
      match_time,
      stream_link,
      team1_score,
      team2_score,
      team1_label,
      team2_label,
      team1:teams!team1_id(
        name,
        team_players(
          users(
            osu_id
          )
        )
      ),
      team2:teams!team2_id(
        name,
        team_players(
          users(
            osu_id
          )
        )
      )
    `,
  );
}

export type LandingPageMatchesData = QueryData<
  ReturnType<typeof getLandingPageMatches>
>;
