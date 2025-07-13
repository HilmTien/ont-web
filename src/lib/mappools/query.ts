import { Database } from "@/generated/database.types";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

interface MappoolParams {
  id: number;
  stageIndex: number;
}

export async function getMappool(
  supabase: SupabaseClient<Database>,
  params: MappoolParams,
) {
  return supabase
    .from("tournaments")
    .select(
      `
        tournament_stages(
          is_public,
          mappool_maps(
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
    .eq("tournament_stages.stage_index", params.stageIndex)
    .single();
}

export type MappoolData = QueryData<ReturnType<typeof getMappool>>;
