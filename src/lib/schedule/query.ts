import { Database } from "@/generated/database.types";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

interface QueryParams {
  tournamentId: number;
}

interface StageMatchesQueryParams extends QueryParams {
  stageIndex: number;
}

export async function getCommentators(
  supabase: SupabaseClient<Database>,
  params: QueryParams,
) {
  return supabase
    .from("commentators")
    .select("id, users(username, osu_id)")
    .eq("tournament_id", params.tournamentId);
}

export async function getReferees(
  supabase: SupabaseClient<Database>,
  params: QueryParams,
) {
  return supabase
    .from("referees")
    .select("id, users(username, osu_id)")
    .eq("tournament_id", params.tournamentId);
}

export async function getStreamers(
  supabase: SupabaseClient<Database>,
  params: QueryParams,
) {
  return supabase
    .from("streamers")
    .select("id, users(username, osu_id)")
    .eq("tournament_id", params.tournamentId);
}

export type CommentatorsQueryData = QueryData<
  ReturnType<typeof getCommentators>
>;
export type RefereesQueryData = QueryData<ReturnType<typeof getReferees>>;
export type StreamersQueryData = QueryData<ReturnType<typeof getStreamers>>;

export async function getTeams(
  supabase: SupabaseClient<Database>,
  params: QueryParams,
) {
  return supabase
    .from("teams")
    .select("id, name")
    .eq("tournament_id", params.tournamentId);
}

export type TeamsQueryData = QueryData<ReturnType<typeof getTeams>>;

export async function getStages(
  supabase: SupabaseClient<Database>,
  params: QueryParams,
) {
  return supabase
    .from("tournament_stages")
    .select("*")
    .eq("tournament_id", params.tournamentId);
}

export type StagesQueryData = QueryData<ReturnType<typeof getStages>>;

export async function getMatches(
  supabase: SupabaseClient<Database>,
  params: QueryParams,
) {
  return supabase
    .from("matches")
    .select("*, team1:teams!team1_id(name), team2:teams!team2_id(name)")
    .eq("tournament_id", params.tournamentId);
}

export type MatchesQueryData = QueryData<ReturnType<typeof getMatches>>;

export async function getStageMatches(
  supabase: SupabaseClient<Database>,
  params: StageMatchesQueryParams,
) {
  return supabase
    .from("tournament_stages")
    .select(
      `
      is_public,
      matches(
        id,
        match_time,
        team1_score,
        team2_score,
        team1_label,
        team2_label,
        mp_id,
        vod_link,
        stream_link,
        tournament_match_id,

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

        referees(
          users(
            username,
            osu_id
          )
        ),
        streamers(
          users(
            username,
            osu_id
          )
        ),
        commentator1:commentators!commentator1_id(
          users(
            username,
            osu_id
          )
        ),
        commentator2:commentators!commentator2_id(
          users(
            username,
            osu_id
          )
        )
      ),
      tournaments(id)
      `,
    )
    .eq("tournaments.id", params.tournamentId)
    .eq("stage_index", params.stageIndex)
    .single();
}

export type StageMatchesQueryData = QueryData<
  ReturnType<typeof getStageMatches>
>;
