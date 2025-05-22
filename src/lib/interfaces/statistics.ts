import { Database } from "@/generated/database.types";

export interface MapEntry {
  [mapIndex: string]: Database["public"]["Tables"]["beatmaps"]["Row"];
}

export interface Statistics {
  [mapIndex: string]: StatisticsEntry[];
}

interface StatisticsEntry {
  name: string;
  score: number;
  mapPlacement: number;
  percentMax: number;
  percentDifference: number;
  zScore: number;
}

interface TeamsEntry {
  id: number;
  name: string;
  tournament_id: number;
}

interface ScoreEntry {
  id: number;
  team_player_id: number;
  mappool_map_id: number;
  score: number;
}

interface TeamPlrsEntry {
  id: number;
  team_id: number;
  user_id: number;
}

interface MappoolMapEntry {
  id: number;
  map_index: string;
}

interface UsersEntry {
  id: number;
  username: string;
}

function applyStatistics(entries: StatisticsEntry[]): void {
  const scores = entries.map((entry) => entry.score);
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const stdavs =
    scores.length > 1
      ? Math.sqrt(
          scores.reduce((a, b) => a + Math.pow(avgScore - b, 2), 0) /
            (scores.length - 1),
        )
      : 0;

  entries.forEach((entry) => {
    // Map Placement
    entry.mapPlacement = scores.filter((s) => s > entry.score).length + 1;

    // Percent Max
    entry.percentMax = maxScore !== 0 ? entry.score / maxScore : 0;

    // Percent Difference
    entry.percentDifference =
      maxScore - minScore !== 0
        ? (entry.score - minScore) / (maxScore - minScore)
        : 1;

    // Z-score
    entry.zScore = stdavs !== 0 ? (entry.score - avgScore) / stdavs : 0;
  });
}

export async function createTeamStats(
  scores: ScoreEntry[],
  mappoolMaps: MappoolMapEntry[],
  teams: TeamsEntry[],
  teamPlrs: TeamPlrsEntry[],
): Promise<Statistics> {
  const stats: Statistics = {};

  mappoolMaps.forEach((map) => {
    const modScores = scores.filter((score) => score.mappool_map_id === map.id);

    const mod = teams.map((team) => {
      const teamPlayerIds = teamPlrs
        .filter((tp) => tp.team_id === team.id)
        .map((tp) => tp.id);

      const totalScore = modScores
        .filter((s) => teamPlayerIds.includes(s.team_player_id))
        .reduce((sum, s) => sum + s.score, 0);

      return {
        name: team.name,
        score: totalScore,
        mapPlacement: 0,
        percentMax: 0,
        percentDifference: 1,
        zScore: 0,
      } as StatisticsEntry;
    });

    applyStatistics(mod);

    stats[map.map_index] = mod;
  });

  return stats;
}

export async function createPlayerStats(
  scores: ScoreEntry[],
  mappoolMaps: MappoolMapEntry[],
  teamPlrs: TeamPlrsEntry[],
  users: UsersEntry[],
): Promise<Statistics> {
  const stats: Statistics = {};

  mappoolMaps.forEach((map) => {
    const modScores = scores.filter((score) => score.mappool_map_id === map.id);

    const mod = users.map((user, index) => {
      const scoreEntry = modScores.find(
        (s) => s.team_player_id === teamPlrs[index].id,
      );
      return {
        name: user.username,
        score: scoreEntry ? scoreEntry.score : 0,
        mapPlacement: 0,
        percentMax: 0,
        percentDifference: 1,
        zScore: 0,
      } as StatisticsEntry;
    });

    applyStatistics(mod);

    stats[map.map_index] = mod;
  });

  return stats;
}
