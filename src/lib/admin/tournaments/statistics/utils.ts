import { auth } from "@/auth";
import { ServerActionResponse } from "@/lib/error";

export async function getMatch(
  id: number,
): ServerActionResponse<GetMatchResponse> {
  const session = await auth();

  if (!session) {
    return { error: "Not authenticated" };
  }

  const res = await fetch(`https://osu.ppy.sh/api/v2/matches/${id}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    return { error: "Could not fetch match" };
  }

  return await res.json();
}

export enum Mods {
  NM = 0,
  NF = 1,
  EZ = 1 << 1,
  HD = 1 << 3,
  HR = 1 << 4,
  DT = 1 << 6,
  FL = 1 << 10,
}

export function modsToInt(modNames: string[]): number {
  return modNames.reduce((acc, mod) => acc | Mods[mod as keyof typeof Mods], 0);
}
