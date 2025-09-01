import { Database } from "@/generated/database.types";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

interface QueryParams {
  id: number;
}

export async function getTournament(
  supabase: SupabaseClient<Database>,
  params: QueryParams,
) {
  return supabase
    .from("tournaments")
    .select(
      `
      id,
      tournament_stages(
        id,
        stage_name,
        stage_index,
        is_public,
        mappool_maps(
          id,
          map_index,
          mods,
          beatmaps(
            *
          )  
        )
      )
      `,
    )
    .eq("id", params.id)
    .single();
}

export type TournamentQueryData = QueryData<ReturnType<typeof getTournament>>;

