"use server";

import { StagesScoresData } from "@/lib/admin/tournaments/statistics/query";
import { getMatch, modsToInt } from "@/lib/admin/tournaments/statistics/utils";
import { isActionError } from "@/lib/error";
import { Score } from "@/lib/osu-api-interfaces/get-match";
import { createServerClient } from "@/lib/server";
import { round } from "@/lib/utils";
import { revalidatePath } from "next/cache";

async function addScore(
  score: Score,
  tournamentId: number,
  mappoolMapid: number,
  teamPlayerId: number,
  endTime: string,
) {
  const supabase = await createServerClient();
  const { data: insertedScore, error: insertedScoreError } = await supabase
    .from("scores")
    .insert({
      tournament_id: tournamentId,
      team_player_id: teamPlayerId,
      mappool_map_id: mappoolMapid,
      score: score.score,
      mods: modsToInt(score.mods),
      end_time: endTime,
      accuracy: round(score.accuracy * 100),
      "100s": score.statistics.count_100,
      "50s": score.statistics.count_50,
      misses: score.statistics.count_miss,
      mode: score.mode_int,
    })
    .select()
    .single();

  if (!insertedScore) {
    await supabase.from("errors").insert(insertedScoreError);

    return { error: "Beatmap could not be inserted" };
  }
  return insertedScore;
}
export async function createScores(
  stage: StagesScoresData[number],
  tournamentId: number,
) {
  const inserts = stage.matches.map(async (match) => {
    if (!match.mp_id) return;
    const osuMatch = await getMatch(match.mp_id);

    if (isActionError(osuMatch)) {
      return { error: `Could not fetch osu match with id: ${match.mp_id}` };
    }
    for (const event of osuMatch.events) {
      if (!event.game) continue;
      for (const score of event.game.scores) {
        let teamPlayerId = 0;
        if (match.team1?.team_players[0].users.osu_id === score.user_id) {
          teamPlayerId = match.team1.team_players[0].id;
        } else if (
          match.team2?.team_players[0].users.osu_id === score.user_id
        ) {
          teamPlayerId = match.team2.team_players[0].id;
        } else {
          continue;
        }
        const mappoolMap = stage.mappool_maps.find(
          (mappoolMap) => mappoolMap.beatmaps.osu_id === event.game?.beatmap_id,
        );

        if (!mappoolMap) continue;

        const mappoolMapId = mappoolMap.id;
        const endTime = event.game.end_time;
        if (!endTime) {
          continue;
        }

        addScore(score, tournamentId, mappoolMapId, teamPlayerId, endTime);
      }
    }
  });
  await Promise.all(inserts);
  revalidatePath(`/statistics/${stage.stage_index}`);
}

export async function deleteScores(stageId: number) {
  const supabase = await createServerClient();

  const { data: mappoolMaps } = await supabase
    .from("mappool_maps")
    .select()
    .eq("stage_id", stageId);

  if (!mappoolMaps) {
    return { error: "Could not fetch mappool maps" };
  }

  const mappoolMapIds = mappoolMaps.map((mappoolMap) => mappoolMap.id);

  const { data: deletedScores, error: deletedScoresError } = await supabase
    .from("scores")
    .delete()
    .in("mappool_map_id", mappoolMapIds)
    .select();

  if (!deletedScores) {
    await supabase.from("errors").insert(deletedScoresError);

    return { error: "Could not delete scores" };
  }

  const { data: stage, error: stageError } = await supabase
    .from("tournament_stages")
    .select("stage_index")
    .eq("stage_id", stageId)
    .single();
  if (!stage) {
    await supabase.from("errors").insert(stageError);

    return { error: "Could not fetch stage data" };
  }

  revalidatePath(`/statistics/${stage.stage_index}`);
}
