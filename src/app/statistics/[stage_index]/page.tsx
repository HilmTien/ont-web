import { StatisticsApp } from "@/components/statistics/statistics-app";
import { StatisticsView } from "@/components/statistics/statistics-view";
import { Tables } from "@/generated/database.types";
import {
  createPlayerStats,
  createTeamStats,
  MapEntry,
} from "@/lib/interfaces/statistics";
import { createServerClient } from "@/lib/server";

export default async function Page({
  params,
}: {
  params: Promise<{ stage_index: string }>;
}) {
  const { stage_index: stageIndexStr } = await params;
  const stage_index = parseInt(stageIndexStr, 10);
  if (Number.isNaN(stage_index)) {
    return <>Invalid url</>;
  }

  const supabase = await createServerClient();

  const { data: teamSize } = await supabase
    .from("tournaments")
    .select("team_size")
    .eq("id", 1)
    .single();

  const { data: stageId } = await supabase
    .from("tournament_stages")
    .select("id")
    .eq("stage_index", stage_index)
    .single();

  const { data: teams } = await supabase
    .from("teams")
    .select()
    .eq("tournament_id", 1);

  const { data: teamPlrs } = await supabase.from("team_players").select();

  if (!teamSize || !stageId || !teams || !teamPlrs) {
    return <>Error fetching data</>;
  }

  const teamsArray = teams.map((team) => team.id);
  const filteredTeamPlrs = teamPlrs.filter((plr) =>
    teamsArray.includes(plr.team_id),
  );

  const { data: users } = await supabase.from("users").select("id, username");

  const { data: mappoolMaps } = await supabase
    .from("mappool_maps")
    .select("id, beatmap_id, map_index")
    .eq("stage_id", stageId.id);

  const { data: allScores } = await supabase
    .from("scores")
    .select("id, team_player_id, mappool_map_id, score")
    .eq("tournament_id", 1);

  if (!users || !mappoolMaps || !allScores) {
    return <>Error fetching data</>;
  }

  const teamPlrsId = filteredTeamPlrs.map((plr) => plr.user_id);
  const filteredUsers = users.filter((user) => teamPlrsId.includes(user.id));
  const mappoolMapsId = mappoolMaps.map((map) => map.id);
  const scores = allScores.filter((score) =>
    mappoolMapsId.includes(score.mappool_map_id),
  );

  const { data: beatmaps } = await supabase.from("beatmaps").select();
  if (!beatmaps) {
    return <>Error fetching data</>;
  }

  const beatmapLookup = new Map(
    beatmaps.map((b: Tables<"beatmaps">) => [b.id, b]),
  );
  const mapIndexes: MapEntry = {};
  for (const map of mappoolMaps) {
    const beatmap = beatmapLookup.get(map.beatmap_id);
    if (beatmap) {
      mapIndexes[map.map_index] = beatmap;
    }
  }

  const [teamStats, playerStats] = await Promise.all([
    createTeamStats(scores, mappoolMaps, teams, filteredTeamPlrs),
    createPlayerStats(scores, mappoolMaps, filteredTeamPlrs, filteredUsers),
  ]);

  return (
    <div className="m-2 flex gap-10">
      <StatisticsApp />
      <StatisticsView
        teamStats={teamStats}
        playerStats={playerStats}
        teamSize={teamSize.team_size}
        mapIndexes={mapIndexes}
      />
    </div>
  );
}
