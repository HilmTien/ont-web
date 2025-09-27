"use server";

import { auth } from "@/auth";
import { Tables } from "@/generated/database.types";
import { ServerActionResponse } from "@/lib/error";
import { GetMatchResponse } from "@/lib/osu-api-interfaces/get-match";
import { createServerClient } from "@/lib/server";
import { revalidatePath } from "next/cache";

export async function updateResult(
  match: Pick<
    Tables<"matches">,
    "id" | "team1_score" | "team2_score" | "mp_id"
  >,
): ServerActionResponse<Tables<"matches">> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("matches")
    .update(match)
    .eq("id", match.id)
    .select()
    .single();

  if (error) {
    await supabase.from("errors").insert(error);
    return { error: "Could not update match result" };
  }

  revalidatePath("/schedule/[stage_index]");
  revalidatePath("/referee");

  return data;
}

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
