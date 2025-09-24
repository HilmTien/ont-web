interface GetMatchResponse {
  match: {
    id: number;
    start_time: string;
    end_time: string | null;
    name: string;
  };
  events: Array<{
    id: number;
    detail: {
      type: string;
      text: string | null;
    };
    timestamp: string;
    user_id?: number;
    game?: {
      id: number;
      start_time: string;
      end_time: string | null;
      beatmap: Beatmap;
      beatmap_id: number;
      mode: Ruleset;
      mode_int: number;
      mods: string[];
      scores: Array<Score>;
      scoring_type: string;
      team_type: string;
    };
  }>;
  users: Array<User>;
  first_event_id: number;
  last_event_id: number;
  current_game_id: number | null;
}

interface User {
  avatar_url: string;
  country_code: string;
  id: number;
  default_group: string | null;
  is_active: boolean;
  is_bot: boolean;
  is_deleted: boolean;
  is_online: boolean;
  is_supporter: boolean;
  last_visit: string | null;
  pm_friends_only: boolean;
  profile_colour: string | null;
  username: string;
  country: {
    code: string;
    name: string;
  };
}

interface Score {
  accuracy: number;
  beatmap_id: number;
  build_id?: number;
  max_combo: number;
  mode: Ruleset;
  mode_int: number;
  mods: string[];
  passed: boolean;
  perfect: boolean;
  pp: number | null;
  rank: string;
  score: number;
  statistics: ScoreStatistics;
  user_id: number;
  match: {
    slot: number;
    team: string;
    pass: boolean;
  };
}

interface ScoreStatistics {
  count_300: number;
  count_100: number;
  count_50: number;
  count_miss: number;
  count_geki: number;
  count_katu: number;
}

interface Beatmap {
  beatmapset_id: number;
  difficulty_rating: number;
  id: number;
  mode: Ruleset;
  status: RankStatus;
  total_length: number;
  user_id: number;
  version: string;
  beatmapset: Beatmapset;
}

type Ruleset = "osu" | "taiko" | "fruits" | "mania";
type RankStatus =
  | "graveyard"
  | "wip"
  | "pending"
  | "ranked"
  | "approved"
  | "qualified"
  | "loved";

interface Beatmapset {
  artist: string;
  artist_unicode: string;
  covers: Covers;
  creator: string;
  favourite_count: number;
  id: number;
  nsfw: boolean;
  offset: number;
  play_count: number;
  preview_url: string;
  source: string;
  status: RankStatus;
  spotlight: boolean;
  title: string;
  title_unicode: string;
  user_id: number;
  video: boolean;
}

interface Covers {
  cover: string;
  "cover@2x": string;
  card: string;
  "card@2x": string;
  list: string;
  "list@2x": string;
  slimcover: string;
  "slimcover@2x": string;
}
