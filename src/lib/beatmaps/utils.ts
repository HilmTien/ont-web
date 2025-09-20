import { auth } from "@/auth";
import { round } from "../utils";

export enum Mods {
  NM = 0,
  EZ = 1 << 1,
  HR = 1 << 4,
  DT = 1 << 6,
}

export async function findBeatmap(id: number, mods: Mods) {
  const session = await auth();

  if (!session) {
    throw new Error("User not logged in");
  }

  const response = await fetch(`https://osu.ppy.sh/api/v2/beatmaps/${id}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
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

  if (mods & Mods.EZ) {
    beatmap.cs *= 0.5;
    beatmap.ar *= 0.5;
    beatmap.accuracy *= 0.5;
    beatmap.drain *= 0.5;
  }

  if (mods & Mods.HR) {
    beatmap.cs = round(Math.min(10, beatmap.cs * 1.3));
    beatmap.ar = round(Math.min(10, beatmap.ar * 1.4));
    beatmap.accuracy = round(Math.min(10, beatmap.accuracy * 1.4));
    beatmap.drain = round(Math.min(10, beatmap.drain * 1.4));
  }

  if (mods & Mods.DT) {
    beatmap.hit_length = Math.round(beatmap.hit_length / 1.5);
    beatmap.bpm = round(beatmap.bpm * 1.5);
    if (beatmap.ar >= 5) {
      beatmap.ar = round((beatmap.ar * 2 + 13) / 3);
    } else {
      beatmap.ar = round((beatmap.ar * 1.6) / 3 + 5);
    }
    beatmap.accuracy = round((beatmap.accuracy * 2) / 3 + 40 / 9);
  }

  if (mods) {
    beatmap.difficulty_rating = await getBeatmapSR(id, mods);
  }

  return beatmap;
}

export async function getBeatmapSR(id: number, mods: Mods): Promise<number> {
  const session = await auth();

  if (!session) {
    throw new Error("User not logged in");
  }

  const response = await fetch(
    `https://osu.ppy.sh/api/v2/beatmaps/${id}/attributes`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        ruleset: "osu",
        mods: mods,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const beatmap = (await response.json()) as {
    attributes: {
      star_rating: number;
    };
  };

  return round(beatmap.attributes.star_rating);
}
