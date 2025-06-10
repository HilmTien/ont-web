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

export interface TeamsEntry {
  id: number;
  name: string;
  tournament_id: number;
}

export interface ScoreEntry {
  id: number;
  team_player_id: number;
  mappool_map_id: number;
  score: number;
}

export interface TeamPlrsEntry {
  id: number;
  team_id: number;
  user_id: number;
}

export interface MappoolMapEntry {
  id: number;
  map_index: string;
}

export interface UsersEntry {
  id: number;
  username: string;
}
