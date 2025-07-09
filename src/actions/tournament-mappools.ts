"use server";

import { Tables } from "@/generated/database.types";
import { TournamentQueryData } from "@/lib/admin/tournaments/mappools/query";
import { isActionError, ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";
import { revalidatePath } from "next/cache";
import { addBeatmap } from "./beatmaps";

export async function addMappoolMap(
  data: {
    osuId: number;
    mapIndex: string;
    mods: string;
  },
  tournament: TournamentQueryData,
): Promise<ServerActionResponse<Tables<"mappool_maps">>> {
  const supabase = await createServerClient();

  const { data: beatmap } = await supabase
    .from("beatmaps")
    .select(
      `
      *,
      mappool_maps(
        id,
        map_index
      )
      `,
    )
    .eq("mappool_maps.stage_id", tournament.tournament_stages[0].id)
    .eq("osu_id", data.osuId)
    .single();

  let beatmapId: number;

  if (!beatmap) {
    const newBeatmap = await addBeatmap(data.osuId);

    if (isActionError(newBeatmap)) {
      return { error: `Beatmap could not be added: ${newBeatmap.error}` };
    }

    beatmapId = newBeatmap.id;
  } else {
    beatmapId = beatmap.id;
  }

  const mappoolMap = tournament.tournament_stages[0].mappool_maps.find(
    (map) => map.map_index === data.mapIndex,
  );

  if (mappoolMap) {
    const { data: updateMappoolMap } = await supabase
      .from("mappool_maps")
      .update({
        map_index: data.mapIndex,
        mods: data.mods,
        stage_id: tournament.tournament_stages[0].id,
        beatmap_id: beatmapId,
      })
      .eq("id", mappoolMap.id)
      .select()
      .single();

    if (!updateMappoolMap) {
      return { error: "Mappool map could not be updated" };
    }

    revalidatePath(`admin/tournaments/${tournament.id}/mappools`);

    console.log("map updated");
    return updateMappoolMap;
  }

  const { data: addedMappoolMap } = await supabase
    .from("mappool_maps")
    .insert({
      map_index: data.mapIndex,
      mods: data.mods,
      stage_id: tournament.tournament_stages[0].id,
      beatmap_id: beatmapId,
    })
    .select()
    .single();

  if (!addedMappoolMap) {
    return { error: "Mappool map could not be added" };
  }

  revalidatePath(`admin/tournaments/${tournament.id}/mappools`);
  console.log("map added");
  return addedMappoolMap;
}

export async function deleteMappoolMap(
  id: number,
): Promise<ServerActionResponse<Tables<"mappool_maps">>> {
  const supabase = await createServerClient();
  const { data: deletedMappoolMap } = await supabase
    .from("mappool_maps")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (!deletedMappoolMap) {
    return { error: "Could not delete the mappool map" };
  }

  const { data: tournament } = await supabase
    .from("tournaments")
    .select(
      `
      id,
      tournament_stages(
      mappool_maps(
        id
      )
    )
    `,
    )
    .eq("tournament_stages.mappool_maps.id", id);

  if (!tournament) {
    return { error: "Could not get tournament data" };
  }

  const specificTournament = tournament.find(
    (tourney) => tourney.tournament_stages.length > 0,
  );

  if (!specificTournament) {
    return { error: "Could not find the specific tournament" };
  }

  revalidatePath(`admin/tournaments/${specificTournament.id}/mappools`);

  return deletedMappoolMap;
}

export async function updateIsPublic(
  tournamentId: number,
  isPublic: boolean,
  stageId: number,
): Promise<ServerActionResponse<Tables<"tournament_stages">>> {
  const supabase = await createServerClient();

  const { data: updatedIsPublic } = await supabase
    .from("tournament_stages")
    .update({ is_public: !isPublic })
    .eq("id", stageId)
    .select()
    .single();

  if (!updatedIsPublic) {
    return { error: "Could not update the isPublic field" };
  }

  revalidatePath(`admin/tournaments/${tournamentId}/mappools`);
  return updatedIsPublic;
}
