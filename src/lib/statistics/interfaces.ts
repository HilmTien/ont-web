interface StatsEntry {
  name: string;
  score: number;
  mapPlacement: number;
  percentMax: number;
  percentDifference: number;
  zScore: number;
}

export interface MapStatistics {
  [mapIndex: string]: MapStatsEntry[];
}

export interface MapStatsEntry extends StatsEntry {
  osuId: number;
}

export interface PlayerStatistics {
  [playerId: string]: PlayerStatsEntry[];
}

export interface PlayerStatsEntry extends StatsEntry {
  mapIndex: string;
}

export interface OverallStatistics {
  [playerId: string]: OverallStatisticsEntry;
}

export interface OverallStatisticsEntry {
  name: string;
  osuId: number;
  zSum: number;
  sumOfPlacements: number;
  percentMax: number;
  percentDifference: number;
  score: number;
  avgScore: number;
}
