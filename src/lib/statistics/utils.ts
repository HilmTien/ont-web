import {
  MapStatistics,
  MapStatsEntry,
  OverallStatistics,
  OverallStatisticsEntry,
  PlayerStatistics,
  PlayerStatsEntry,
} from "./interfaces";
import { StatisticsQueryData } from "./query";

function applyStatistics(entries: MapStatsEntry[]) {
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

function createOverallStats(
  mapStats: MapStatistics,
  playerStats: PlayerStatistics,
) {
  const overallStats: OverallStatistics = {};
  const mapStatsValues = Object.values(mapStats);

  mapStatsValues.forEach((mapStats) => {
    for (const currentMap of mapStats) {
      const player = overallStats[currentMap.osuId];
      if (player) {
        player.zSum += currentMap.zScore;
        player.sumOfPlacements += currentMap.mapPlacement;
        player.percentMax += currentMap.percentMax;
        player.percentDifference += currentMap.percentDifference;
        player.score += currentMap.score;
      } else {
        const player: OverallStatisticsEntry = {
          name: currentMap.name,
          osuId: currentMap.osuId,
          zSum: currentMap.zScore,
          sumOfPlacements: currentMap.mapPlacement,
          percentMax: currentMap.percentMax,
          percentDifference: currentMap.percentDifference,
          score: currentMap.score,
          avgScore: 0,
        };
        overallStats[currentMap.osuId] = player;
      }
    }
  });

  Object.values(overallStats).forEach((plr) => {
    const playerStat = playerStats[plr.osuId];
    plr.avgScore = plr.score / playerStat.length;
  });

  return overallStats;
}

function createPlayerStats(mapStats: MapStatistics) {
  const playerStats: PlayerStatistics = {};
  const mapKey = Object.keys(mapStats);
  const maps = Object.values(mapStats);

  maps.forEach((map, i) => {
    for (let v = 0; v < map.length; v++) {
      const currentMap = map[v];
      const player = playerStats[currentMap.osuId];
      if (player) {
        const playerMap: PlayerStatsEntry = {
          mapIndex: mapKey[i],
          name: currentMap.name,
          score: currentMap.score,
          mapPlacement: currentMap.mapPlacement,
          percentMax: currentMap.percentMax,
          percentDifference: currentMap.percentDifference,
          zScore: currentMap.zScore,
        };
        player.push(playerMap);
      } else {
        playerStats[currentMap.osuId] = [];
        const playerMap: PlayerStatsEntry = {
          mapIndex: mapKey[i],
          name: currentMap.name,
          score: currentMap.score,
          mapPlacement: currentMap.mapPlacement,
          percentMax: currentMap.percentMax,
          percentDifference: currentMap.percentDifference,
          zScore: currentMap.zScore,
        };
        playerStats[currentMap.osuId].push(playerMap);
      }
    }
  });

  return playerStats;
}

export async function makeStatistics(
  statistics: StatisticsQueryData,
): Promise<[MapStatistics, MapStatistics, OverallStatistics]> {
  const mapStats: MapStatistics = {};
  const bestMapStats: MapStatistics = {};

  const mappoolMaps = statistics.mappool_maps.sort((a, b) =>
    a.map_index.localeCompare(b.map_index, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );

  mappoolMaps.forEach((map) => {
    const mapScore = map.scores.map((plrScore) => {
      const user = plrScore.team_players.users;
      return {
        name: user.username,
        osuId: user.osu_id,
        score: plrScore.score,
        mapPlacement: 0,
        percentMax: 0,
        percentDifference: 1,
        zScore: 0,
        mods: plrScore.mods,
      } as MapStatsEntry;
    });

    applyStatistics(mapScore);

    mapStats[map.map_index] = mapScore;
  });

  mappoolMaps.forEach((map) => {
    const bestMapScore: MapStatsEntry[] = [];

    map.scores.map((plrScore) => {
      const user = plrScore.team_players.users;

      const newScore = {
        name: user.username,
        osuId: user.osu_id,
        score: plrScore.score,
        mapPlacement: 0,
        percentMax: 0,
        percentDifference: 1,
        zScore: 0,
        mods: plrScore.mods,
      } as MapStatsEntry;

      const userScore = bestMapScore.find(
        (score) => score.osuId === user.osu_id,
      );
      if (userScore) {
        if (newScore.score > userScore.score) {
          const scoreIndex = bestMapScore.findIndex(
            (score) => score.osuId === user.osu_id,
          );
          bestMapScore[scoreIndex] = newScore;
        }
      } else {
        bestMapScore.push(newScore);
      }
    });

    applyStatistics(bestMapScore);
    bestMapStats[map.map_index] = bestMapScore;
  });

  const playerStats = createPlayerStats(bestMapStats);

  const overallStats = createOverallStats(bestMapStats, playerStats);

  return [mapStats, bestMapStats, overallStats];
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

export function intToMods(value: number): string[] {
  if (value === 0) {
    return ["NM"];
  }

  return (Object.keys(Mods) as (keyof typeof Mods)[])
    .filter((key) => typeof Mods[key] === "number" && Mods[key] !== 0)
    .filter((key) => (value & Mods[key]) !== 0);
}
