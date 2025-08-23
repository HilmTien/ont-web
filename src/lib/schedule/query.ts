import { Database } from "@/generated/database.types";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

interface QueryParams {
  tournamentId: number;
}

export async function getCommentators(
  supabase: SupabaseClient<Database>,
  params: QueryParams,
) {
  return supabase
    .from("commentators")
    .select("id, users(username)")
    .eq("tournament_id", params.tournamentId);
}

export async function getReferees(
  supabase: SupabaseClient<Database>,
  params: QueryParams,
) {
  return supabase
    .from("referees")
    .select("id, users(username)")
    .eq("tournament_id", params.tournamentId);
}

export async function getStreamers(
  supabase: SupabaseClient<Database>,
  params: QueryParams,
) {
  return supabase
    .from("streamers")
    .select("id, users(username)")
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
