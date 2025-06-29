export interface MapStatistics {
  [mapIndex: string]: MapStatsEntry[];
}

export interface MapStatsEntry {
  name: string;
  osuId: number;
  score: number;
  mapPlacement: number;
  percentMax: number;
  percentDifference: number;
  zScore: number;
}

export interface PlayerStatistics {
  [playerId: string]: PlayerStatsEntry[];
}

export interface PlayerStatsEntry {
  mapIndex: string;
  name: string;
  score: number;
  mapPlacement: number;
  percentMax: number;
  percentDifference: number;
  zScore: number;
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
