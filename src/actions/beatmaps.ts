"use server";

import { auth } from "@/lib/auth";
import { ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";

export async function findBeatmap(id: number) {
  const session = await auth();

  const response = await fetch(`https://osu.ppy.sh/api/v2/beatmaps/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
  const beatmap = (await response.json()) as {
    beatmapset: {
      title: string;
      artist: string;
      covers: { cover: string };
      creator: string;
    };
    version: string;
    owners: [{ username: string }];
    hit_length: number;
    difficulty_rating: number;
    bpm: number;
    last_updated: string;
    cs: number;
    ar: number;
    accuracy: number;
    drain: number;
  };

  return beatmap;
}

export async function addBeatmap(data: {
  id: number;
}): Promise<ServerActionResponse> {
  const supabase = await createServerClient();
  const submittedBeatmap = await findBeatmap(data.id);

  const { data: beatmap } = await supabase
    .from("beatmaps")
    .select()
    .eq("osu_id", data.id)
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
      osu_id: data.id,
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
      osu_id: data.id,
      cover: submittedBeatmap.beatmapset.covers.cover,
    });
  } else {
    console.log("The beatmap is already in the database.");
  }
}
