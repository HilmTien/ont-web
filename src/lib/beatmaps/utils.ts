import { auth } from "@/auth";

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
