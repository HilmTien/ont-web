"use server";

import { findBeatmap } from "@/lib/beatmaps/utils";
import { ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";

export async function addBeatmap(id: number): Promise<ServerActionResponse> {
  const supabase = await createServerClient();
  const submittedBeatmap = await findBeatmap(id);

  const { data: beatmap } = await supabase
    .from("beatmaps")
    .select()
    .eq("osu_id", id)
    .single();

  if (!beatmap) {
    await supabase.from("beatmaps").insert({
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
    });
  } else if (submittedBeatmap.last_updated > beatmap.last_updated) {
    await supabase.from("beatmaps").update({
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
    });
  } else {
    console.log("The beatmap is already in the database.");
  }
}
