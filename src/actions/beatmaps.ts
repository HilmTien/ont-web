"use server";

import { Tables } from "@/generated/database.types";
import { findBeatmap } from "@/lib/beatmaps/utils";
import { ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";

export async function addBeatmap(
  id: number,
): Promise<ServerActionResponse<Tables<"beatmaps">>> {
  const supabase = await createServerClient();

  try {
    const submittedBeatmap = await findBeatmap(id);
    const { data: beatmap } = await supabase
      .from("beatmaps")
      .select()
      .eq("osu_id", id)
      .single();

    if (!beatmap) {
      const { data: insertBeatmap } = await supabase.from("beatmaps").insert({
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

      if (!insertBeatmap) {
        return { error: "Beatmap could not be inserted" };
      }

      return insertBeatmap;
    } else if (submittedBeatmap.last_updated > beatmap.last_updated) {
      const { data: updateBeatmap } = await supabase
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
        .eq("osu_id", id);

      if (!updateBeatmap) {
        return { error: "Beatmap could not be updated" };
      }

      return updateBeatmap;
    } else {
      return { error: "Beatmap already in the database" };
    }
  } catch (err) {
    if (err instanceof Error) {
      return { error: err.message };
    }

    return { error: "Unknown error" };
  }
}
