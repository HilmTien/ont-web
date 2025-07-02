"use server";

import { Tables } from "@/generated/database.types";
import { findBeatmap } from "@/lib/beatmaps/utils";
import { ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";

export async function addBeatmap(
  id: number,
): Promise<ServerActionResponse<Tables<"beatmaps">>> {
  const supabase = await createServerClient();
  const submittedBeatmap = await findBeatmap(id);

  const { data: beatmap } = await supabase
    .from("beatmaps")
    .select()
    .eq("osu_id", id)
    .single();

  if (!beatmap) {
    const { data: insertedMap } = await supabase
      .from("beatmaps")
      .insert({
        name: submittedBeatmap.beatmapset.title,
        artist: submittedBeatmap.beatmapset.artist,
        difficulty_name: submittedBeatmap.version,
        mapper: submittedBeatmap.owners[0].username,
        drain_time: submittedBeatmap.hit_length,
        star_rating: submittedBeatmap.difficulty_rating,
        bpm: submittedBeatmap.bpm,
        mapset_host: submittedBeatmap.beatmapset.creator,
        last_updated: submittedBeatmap.last_updated,
        cs: submittedBeatmap.cs,
        ar: submittedBeatmap.ar,
        od: submittedBeatmap.accuracy,
        hp: submittedBeatmap.drain,
        osu_id: id,
        cover: submittedBeatmap.beatmapset.covers.cover,
      })
      .select()
      .single();

    if (!insertedMap) {
      return { error: "Beatmap could not be inserted" };
    }

    return insertedMap;
  } else if (submittedBeatmap.last_updated > beatmap.last_updated) {
    const { data: updatedMap } = await supabase
      .from("beatmaps")
      .update({
        name: submittedBeatmap.beatmapset.title,
        artist: submittedBeatmap.beatmapset.artist,
        difficulty_name: submittedBeatmap.version,
        mapper: submittedBeatmap.owners[0].username,
        drain_time: submittedBeatmap.hit_length,
        star_rating: submittedBeatmap.difficulty_rating,
        bpm: submittedBeatmap.bpm,
        mapset_host: submittedBeatmap.beatmapset.creator,
        last_updated: submittedBeatmap.last_updated,
        cs: submittedBeatmap.cs,
        ar: submittedBeatmap.ar,
        od: submittedBeatmap.accuracy,
        hp: submittedBeatmap.drain,
        osu_id: id,
        cover: submittedBeatmap.beatmapset.covers.cover,
      })
      .eq("osu_id", id)
      .select()
      .single();

    if (!updatedMap) {
      return { error: "Beatmap could not be updated" };
    }

    return updatedMap;
  } else {
    return { error: "The beatmap is already in the database" };
  }
}
