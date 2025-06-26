import { Tables } from "@/generated/database.types";

export interface MapEntry {
  [mapIndex: string]: Tables<"beatmaps">;
}

export interface Statistics {
  [mapIndex: string]: StatisticsEntry[];
}

export interface StatisticsEntry {
  name: string;
  score: number;
  mapPlacement: number;
  percentMax: number;
  percentDifference: number;
  zScore: number;
}
