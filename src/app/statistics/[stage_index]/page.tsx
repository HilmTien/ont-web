import { createPlayerStats, createTeamStats } from "@/actions/statistics";
import { StatisticsApp } from "@/components/statistics/statistics-app";
import { StatisticsView } from "@/components/statistics/statistics-view";
import { createServerClient } from "@/lib/server";

interface MapIndexEntry {
  [mapIndex: string]: MapDataEntry;
}

interface MapDataEntry {
  id: number;
  name: string;
  artist: string;
  difficulty_name: string;
  cover: string;
}

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
  const [teamSizeRes, stageIdRes] = await Promise.all([
    supabase.from("tournaments").select("team_size").eq("id", 1).single(),
    supabase
      .from("tournament_stages")
      .select("id")
      .eq("stage_index", stage_index)
      .single(),
  ]);

  if (!teamSizeRes.data || !stageIdRes.data) {
    return <>Error fetching tournament or stage data</>;
  }
  const teamSize = teamSizeRes.data;
  const stageId = stageIdRes.data;

  const [teamsRes, teamPlrsRes] = await Promise.all([
    supabase.from("teams").select().eq("tournament_id", 1),
    supabase.from("team_players").select(),
  ]);

  if (!teamsRes.data || !teamPlrsRes.data) {
    return <>Error fetching teams or team players</>;
  }
  const teams = teamsRes.data;
  const teamPlrs = teamPlrsRes.data;
  const teamsArray = teams.map((team) => team.id);
  const filteredTeamPlrs = teamPlrs.filter((plr) =>
    teamsArray.includes(plr.team_id),
  );

  const [usersRes, mappoolMapsRes, allScoresRes] = await Promise.all([
    supabase.from("users").select("id, username"),
    supabase
      .from("mappool_maps")
      .select("id, beatmap_id, map_index")
      .eq("stage_id", stageId.id),
    supabase
      .from("scores")
      .select("id, team_player_id, mappool_map_id, score")
      .eq("tournament_id", 1),
  ]);

  if (!usersRes.data || !mappoolMapsRes.data || !allScoresRes.data) {
    return <>Error fetching users, mappool maps, or scores</>;
  }
  const users = usersRes.data;
  const mappoolMaps = mappoolMapsRes.data;
  const allScores = allScoresRes.data;
  const teamPlrsId = filteredTeamPlrs.map((plr) => plr.user_id);
  const filteredUsers = users.filter((user) => teamPlrsId.includes(user.id));
  const mappoolMapsId = mappoolMaps.map((map) => map.id);
  const scores = allScores.filter((score) =>
    mappoolMapsId.includes(score.mappool_map_id),
  );

  const beatmapsRes = await supabase.from("beatmaps").select();
  if (!beatmapsRes.data) {
    return <>Error fetching beatmaps</>;
  }
  const beatmaps = beatmapsRes.data;
  const beatmapLookup = new Map(beatmaps.map((b: any) => [b.id, b]));
  const mapIndexes: MapIndexEntry = {};
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
