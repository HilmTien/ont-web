import { Statistics, StatisticsEntry } from "./interfaces";
import { TournamentQueryData } from "./query";

function applyStatistics(entries: StatisticsEntry[]) {
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

export async function createPlayerStats(
  tournament: TournamentQueryData,
): Promise<Statistics> {
  const stats: Statistics = {};

  const mappoolMaps = tournament.tournament_stages[0].mappool_maps.sort(
    (a, b) =>
      a.map_index.localeCompare(b.map_index, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
  );

  mappoolMaps.forEach((map) => {
    const playerScore = map.scores.map((plrScore) => {
      const username = plrScore.team_players.users.username;
      return {
        name: username,
        score: plrScore.score,
        mapPlacement: 0,
        percentMax: 0,
        percentDifference: 1,
        zScore: 0,
      } as StatisticsEntry;
    });

    applyStatistics(playerScore);
    stats[map.map_index] = playerScore;
  });

  return stats;
}
