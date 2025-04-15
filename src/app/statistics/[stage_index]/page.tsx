import { createPlayerStats, createTeamStats } from "@/actions/statistics";
import { StatisticsApp } from "@/components/statistics/statistics-app";
import { StatisticsView } from "@/components/statistics/statistics-view";
import { createServerClient } from "@/lib/server";

export default async function Page({
  params,
}: {
  params: Promise<{ stage_index: string }>;
}) {
  const stage_index = parseInt((await params).stage_index, 10);

  if (Number.isNaN(stage_index)) {
    return <>Invalid url</>;
  }

  const supabase = await createServerClient();

  const { data: teamSize } = await supabase
    .from("tournaments")
    .select("team_size")
    .eq("id", 1)
    .single();

  if (!teamSize) {
    return;
  }

  const { data: stageId } = await supabase
    .from("tournament_stages")
    .select("id")
    .eq("stage_index", stage_index)
    .single();

  if (!stageId) {
    return;
  }

  const { data: teams } = await supabase
    .from("teams")
    .select()
    .eq("tournament_id", 1);

  const { data: teamPlrs } = await supabase.from("team_players").select();

  if (!teams || !teamPlrs) {
    return;
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

  if (!allScores || !teamPlrs || !users || !mappoolMaps) {
    return;
  }

  const teamPlrsId = filteredTeamPlrs.map((plr) => plr.user_id);
  const filteredUsers = users.filter((user) => teamPlrsId.includes(user.id));

  const mappoolMapsId = mappoolMaps.map((map) => map.id);
  const scores = allScores.filter((score) =>
    mappoolMapsId.includes(score.mappool_map_id),
  );

  const { data: beatmaps } = await supabase.from("beatmaps").select();

  if (!beatmaps) {
    return;
  }

  const beatmapsId = mappoolMaps.map((map) => map.beatmap_id);
  const filteredBeatmaps = beatmaps.filter((beatmap) =>
    beatmapsId.includes(beatmap.id),
  );

  const teamStats = await createTeamStats(
    scores,
    mappoolMaps,
    teams,
    filteredTeamPlrs,
  );
  const playerStats = await createPlayerStats(
    scores,
    mappoolMaps,
    filteredTeamPlrs,
    filteredUsers,
  );

  return (
    <div className="m-2 flex gap-10">
      <StatisticsApp />
      <StatisticsView
        teamStats={teamStats}
        playerStats={playerStats}
        teamSize={teamSize.team_size}
      />
    </div>
  );
}
