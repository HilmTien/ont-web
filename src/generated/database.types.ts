export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      beatmaps: {
        Row: {
          ar: number | null
          artist: string
          bpm: number
          cs: number | null
          difficulty_name: string
          drain_time: number
          hp: number | null
          id: number
          mapper: string
          name: string
          od: number | null
          osu_id: number | null
          star_rating: number
        }
        Insert: {
          ar?: number | null
          artist: string
          bpm: number
          cs?: number | null
          difficulty_name: string
          drain_time: number
          hp?: number | null
          id?: number
          mapper: string
          name: string
          od?: number | null
          osu_id?: number | null
          star_rating: number
        }
        Update: {
          ar?: number | null
          artist?: string
          bpm?: number
          cs?: number | null
          difficulty_name?: string
          drain_time?: number
          hp?: number | null
          id?: number
          mapper?: string
          name?: string
          od?: number | null
          osu_id?: number | null
          star_rating?: number
        }
        Relationships: []
      }
      commentators: {
        Row: {
          id: number
          tournament_id: number
          user_id: number
        }
        Insert: {
          id?: number
          tournament_id: number
          user_id: number
        }
        Update: {
          id?: number
          tournament_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "commentators_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commentators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      mappool_maps: {
        Row: {
          beatmap_id: number
          id: number
          map_index: string
          mods: string | null
          stage_id: number
        }
        Insert: {
          beatmap_id: number
          id?: number
          map_index: string
          mods?: string | null
          stage_id: number
        }
        Update: {
          beatmap_id?: number
          id?: number
          map_index?: string
          mods?: string | null
          stage_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "mappool_maps_beatmap_id_fkey"
            columns: ["beatmap_id"]
            isOneToOne: false
            referencedRelation: "beatmaps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mappool_maps_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "tournament_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          commentator1_id: number | null
          commentator2_id: number | null
          id: number
          match_time: string
          mp_id: number | null
          referee_id: number | null
          stage_id: number
          streamer_id: number | null
          team1_id: number
          team1_score: number | null
          team2_id: number
          team2_score: number | null
          tournament_id: number
          tournament_match_id: string
        }
        Insert: {
          commentator1_id?: number | null
          commentator2_id?: number | null
          id?: number
          match_time: string
          mp_id?: number | null
          referee_id?: number | null
          stage_id: number
          streamer_id?: number | null
          team1_id: number
          team1_score?: number | null
          team2_id: number
          team2_score?: number | null
          tournament_id: number
          tournament_match_id: string
        }
        Update: {
          commentator1_id?: number | null
          commentator2_id?: number | null
          id?: number
          match_time?: string
          mp_id?: number | null
          referee_id?: number | null
          stage_id?: number
          streamer_id?: number | null
          team1_id?: number
          team1_score?: number | null
          team2_id?: number
          team2_score?: number | null
          tournament_id?: number
          tournament_match_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_commentator1_id_fkey"
            columns: ["commentator1_id"]
            isOneToOne: false
            referencedRelation: "commentators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_commentator2_id_fkey"
            columns: ["commentator2_id"]
            isOneToOne: false
            referencedRelation: "commentators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_referee_id_fkey"
            columns: ["referee_id"]
            isOneToOne: false
            referencedRelation: "referees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "tournament_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_streamer_id_fkey"
            columns: ["streamer_id"]
            isOneToOne: false
            referencedRelation: "streamers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team1_id_fkey"
            columns: ["team1_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team2_id_fkey"
            columns: ["team2_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      qualifier_lobbies: {
        Row: {
          id: number
          lobby_time: string
          mp_id: number | null
          referee_id: number | null
          stage_id: number
          tournament_match_id: string
        }
        Insert: {
          id?: number
          lobby_time: string
          mp_id?: number | null
          referee_id?: number | null
          stage_id: number
          tournament_match_id: string
        }
        Update: {
          id?: number
          lobby_time?: string
          mp_id?: number | null
          referee_id?: number | null
          stage_id?: number
          tournament_match_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "qualifier_lobbies_referee_id_fkey"
            columns: ["referee_id"]
            isOneToOne: false
            referencedRelation: "referees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qualifier_lobbies_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "tournament_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      qualifier_signups: {
        Row: {
          id: number
          lobby_id: number
          signed_up_at: string
          user_id: number
        }
        Insert: {
          id?: number
          lobby_id: number
          signed_up_at?: string
          user_id: number
        }
        Update: {
          id?: number
          lobby_id?: number
          signed_up_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "qualifier_signups_lobby_id_fkey"
            columns: ["lobby_id"]
            isOneToOne: false
            referencedRelation: "qualifier_lobbies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qualifier_signups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      referees: {
        Row: {
          id: number
          tournament_id: number
          user_id: number
        }
        Insert: {
          id?: number
          tournament_id: number
          user_id: number
        }
        Update: {
          id?: number
          tournament_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "referees_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      registrations: {
        Row: {
          id: number
          registered_at: string
          tournament_id: number
          user_id: number
        }
        Insert: {
          id?: number
          registered_at?: string
          tournament_id: number
          user_id: number
        }
        Update: {
          id?: number
          registered_at?: string
          tournament_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "registrations_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      scores: {
        Row: {
          "100s": number | null
          "50s": number | null
          accuracy: number
          end_time: string
          id: number
          mappool_map_id: number
          misses: number | null
          mode: number
          mods: number
          score: number
          team_player_id: number
          tournament_id: number
        }
        Insert: {
          "100s"?: number | null
          "50s"?: number | null
          accuracy: number
          end_time: string
          id?: number
          mappool_map_id: number
          misses?: number | null
          mode: number
          mods: number
          score: number
          team_player_id: number
          tournament_id: number
        }
        Update: {
          "100s"?: number | null
          "50s"?: number | null
          accuracy?: number
          end_time?: string
          id?: number
          mappool_map_id?: number
          misses?: number | null
          mode?: number
          mods?: number
          score?: number
          team_player_id?: number
          tournament_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "scores_mappool_map_id_fkey"
            columns: ["mappool_map_id"]
            isOneToOne: false
            referencedRelation: "mappool_maps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scores_team_player_id_fkey"
            columns: ["team_player_id"]
            isOneToOne: false
            referencedRelation: "team_players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scores_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      streamers: {
        Row: {
          id: number
          tournament_id: number
          user_id: number
        }
        Insert: {
          id?: number
          tournament_id: number
          user_id: number
        }
        Update: {
          id?: number
          tournament_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "streamers_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "streamers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      team_players: {
        Row: {
          id: number
          team_id: number
          user_id: number
        }
        Insert: {
          id?: number
          team_id: number
          user_id: number
        }
        Update: {
          id?: number
          team_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "team_players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_players_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          id: number
          name: string
          tournament_id: number
        }
        Insert: {
          id?: number
          name: string
          tournament_id: number
        }
        Update: {
          id?: number
          name?: string
          tournament_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "teams_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_stages: {
        Row: {
          id: number
          stage_index: number
          stage_name: string
          stage_type: Database["public"]["Enums"]["stage_types"]
          tournament_id: number
        }
        Insert: {
          id?: number
          stage_index: number
          stage_name: string
          stage_type: Database["public"]["Enums"]["stage_types"]
          tournament_id: number
        }
        Update: {
          id?: number
          stage_index?: number
          stage_name?: string
          stage_type?: Database["public"]["Enums"]["stage_types"]
          tournament_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tournament_stages_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          acronym: string
          id: number
          name: string
          team_size: number | null
        }
        Insert: {
          acronym: string
          id?: number
          name: string
          team_size?: number | null
        }
        Update: {
          acronym?: string
          id?: number
          name?: string
          team_size?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          id: number
          osu_id: number
          username: string
        }
        Insert: {
          id?: number
          osu_id: number
          username: string
        }
        Update: {
          id?: number
          osu_id?: number
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      stage_types: "qualifiers" | "pvp"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

