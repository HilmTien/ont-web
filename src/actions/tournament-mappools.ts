"use server";

import { Tables } from "@/generated/database.types";
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
  tourneyId: number,
  stageId: number,
): ServerActionResponse<Tables<"mappool_maps">> {
  const supabase = await createServerClient();

  const { data: tournamentStage } = await supabase
    .from("tournament_stages")
    .select(
      `
      id,
      mappool_maps(
        id,
        map_index
      ),
      tournaments(
        id
      )
    `,
    )
    .eq("id", stageId)
    .eq("tournaments.id", tourneyId)
    .single();

  if (!tournamentStage) {
    return { error: `Error fetching tournament stage data` };
  }

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
    .eq("mappool_maps.stage_id", tournamentStage.id)
    .eq("osu_id", data.osuId)
    .single();

  let beatmapId = beatmap?.id;

  if (!beatmapId) {
    const newBeatmap = await addBeatmap(data.osuId);

    if (isActionError(newBeatmap)) {
      return { error: `Beatmap could not be added: ${newBeatmap.error}` };
    }

    beatmapId = newBeatmap.id;
  }

  const mappoolMap = tournamentStage.mappool_maps.find(
    (map) => map.map_index === data.mapIndex,
  );

  if (mappoolMap) {
    const { data: updateMappoolMap } = await supabase
      .from("mappool_maps")
      .update({
        map_index: data.mapIndex,
        mods: data.mods,
        stage_id: tournamentStage.id,
        beatmap_id: beatmapId,
      })
      .eq("id", mappoolMap.id)
      .select()
      .single();

    if (!updateMappoolMap) {
      return { error: "Mappool map could not be updated" };
    }

    revalidatePath(
      `admin/tournaments/${tournamentStage.tournaments.id}/mappools`,
    );

    return updateMappoolMap;
  }

  const { data: addedMappoolMap } = await supabase
    .from("mappool_maps")
    .insert({
      map_index: data.mapIndex,
      mods: data.mods,
      stage_id: tournamentStage.id,
      beatmap_id: beatmapId,
    })
    .select()
    .single();

  if (!addedMappoolMap) {
    return { error: "Mappool map could not be added" };
  }

  revalidatePath(
    `admin/tournaments/${tournamentStage.tournaments.id}/mappools`,
  );
  return addedMappoolMap;
}

export async function deleteMappoolMap(
  id: number,
): ServerActionResponse<Tables<"mappool_maps">> {
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
