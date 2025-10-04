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
      admins: {
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
            foreignKeyName: "admins_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      beatmaps: {
        Row: {
          ar: number | null
          artist: string
          bpm: number
          cover: string | null
          cs: number | null
          difficulty_name: string
          drain_time: number
          hp: number | null
          id: number
          last_updated: string
          mapper: string
          mapset_host: string
          name: string
          od: number | null
          osu_id: number | null
          star_rating: number
        }
        Insert: {
          ar?: number | null
          artist: string
          bpm: number
          cover?: string | null
          cs?: number | null
          difficulty_name: string
          drain_time: number
          hp?: number | null
          id?: number
          last_updated: string
          mapper: string
          mapset_host: string
          name: string
          od?: number | null
          osu_id?: number | null
          star_rating: number
        }
        Update: {
          ar?: number | null
          artist?: string
          bpm?: number
          cover?: string | null
          cs?: number | null
          difficulty_name?: string
          drain_time?: number
          hp?: number | null
          id?: number
          last_updated?: string
          mapper?: string
          mapset_host?: string
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
      errors: {
        Row: {
          code: string | null
          created_at: string | null
          details: string | null
          hint: string | null
          id: number
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          details?: string | null
          hint?: string | null
          id?: number
        }
        Update: {
          code?: string | null
          created_at?: string | null
          details?: string | null
          hint?: string | null
          id?: number
        }
        Relationships: []
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
          stream_link: string | null
          streamer_id: number | null
          team1_id: number | null
          team1_label: string | null
          team1_score: number | null
          team2_id: number | null
          team2_label: string | null
          team2_score: number | null
          tournament_id: number
          tournament_match_id: string
          vod_link: string | null
        }
        Insert: {
          commentator1_id?: number | null
          commentator2_id?: number | null
          id?: number
          match_time: string
          mp_id?: number | null
          referee_id?: number | null
          stage_id: number
          stream_link?: string | null
          streamer_id?: number | null
          team1_id?: number | null
          team1_label?: string | null
          team1_score?: number | null
          team2_id?: number | null
          team2_label?: string | null
          team2_score?: number | null
          tournament_id: number
          tournament_match_id: string
          vod_link?: string | null
        }
        Update: {
          commentator1_id?: number | null
          commentator2_id?: number | null
          id?: number
          match_time?: string
          mp_id?: number | null
          referee_id?: number | null
          stage_id?: number
          stream_link?: string | null
          streamer_id?: number | null
          team1_id?: number | null
          team1_label?: string | null
          team1_score?: number | null
          team2_id?: number | null
          team2_label?: string | null
          team2_score?: number | null
          tournament_id?: number
          tournament_match_id?: string
          vod_link?: string | null
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
          best_of: number | null
          bracket_type: Database["public"]["Enums"]["bracket_types"] | null
          id: number
          is_public: boolean
          stage_index: number
          stage_name: string
          stage_type: Database["public"]["Enums"]["stage_types"]
          tournament_id: number
        }
        Insert: {
          best_of?: number | null
          bracket_type?: Database["public"]["Enums"]["bracket_types"] | null
          id?: number
          is_public?: boolean
          stage_index: number
          stage_name: string
          stage_type: Database["public"]["Enums"]["stage_types"]
          tournament_id: number
        }
        Update: {
          best_of?: number | null
          bracket_type?: Database["public"]["Enums"]["bracket_types"] | null
          id?: number
          is_public?: boolean
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
          can_register: boolean
          id: number
          name: string
          team_size: number | null
        }
        Insert: {
          acronym: string
          can_register?: boolean
          id?: number
          name: string
          team_size?: number | null
        }
        Update: {
          acronym?: string
          can_register?: boolean
          id?: number
          name?: string
          team_size?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          accuracy: number | null
          badges: number | null
          country_code: string | null
          id: number
          is_restricted: boolean
          maximum_combo: number | null
          osu_id: number
          play_count: number | null
          pp: number | null
          rank: number | null
          tournament_badges: number | null
          username: string
        }
        Insert: {
          accuracy?: number | null
          badges?: number | null
          country_code?: string | null
          id?: number
          is_restricted: boolean
          maximum_combo?: number | null
          osu_id: number
          play_count?: number | null
          pp?: number | null
          rank?: number | null
          tournament_badges?: number | null
          username: string
        }
        Update: {
          accuracy?: number | null
          badges?: number | null
          country_code?: string | null
          id?: number
          is_restricted?: boolean
          maximum_combo?: number | null
          osu_id?: number
          play_count?: number | null
          pp?: number | null
          rank?: number | null
          tournament_badges?: number | null
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
      bracket_types: "swiss" | "singleelim"
      stage_types: "qualifiers" | "pvp"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      bracket_types: ["swiss", "singleelim"],
      stage_types: ["qualifiers", "pvp"],
    },
  },
} as const

