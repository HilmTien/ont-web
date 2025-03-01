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
          artist: string | null
          bpm: number | null
          cs: number | null
          difficulty_name: string | null
          drain_time: number | null
          hp: number | null
          id: number
          mapper: string | null
          name: string | null
          od: number | null
          osu_id: number | null
          star_rating: number | null
        }
        Insert: {
          ar?: number | null
          artist?: string | null
          bpm?: number | null
          cs?: number | null
          difficulty_name?: string | null
          drain_time?: number | null
          hp?: number | null
          id: number
          mapper?: string | null
          name?: string | null
          od?: number | null
          osu_id?: number | null
          star_rating?: number | null
        }
        Update: {
          ar?: number | null
          artist?: string | null
          bpm?: number | null
          cs?: number | null
          difficulty_name?: string | null
          drain_time?: number | null
          hp?: number | null
          id?: number
          mapper?: string | null
          name?: string | null
          od?: number | null
          osu_id?: number | null
          star_rating?: number | null
        }
        Relationships: []
      }
      commentators: {
        Row: {
          id: number
          tournament_id: number | null
          user_id: number | null
        }
        Insert: {
          id: number
          tournament_id?: number | null
          user_id?: number | null
        }
        Update: {
          id?: number
          tournament_id?: number | null
          user_id?: number | null
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
          beatmap_id: number | null
          id: number
          map_index: string | null
          mappool_id: number | null
        }
        Insert: {
          beatmap_id?: number | null
          id: number
          map_index?: string | null
          mappool_id?: number | null
        }
        Update: {
          beatmap_id?: number | null
          id?: number
          map_index?: string | null
          mappool_id?: number | null
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
            foreignKeyName: "mappool_maps_mappool_id_fkey"
            columns: ["mappool_id"]
            isOneToOne: false
            referencedRelation: "mappools"
            referencedColumns: ["id"]
          },
        ]
      }
      mappools: {
        Row: {
          id: number
          stage_index: number | null
          stage_name: string | null
          tournament_id: number | null
        }
        Insert: {
          id: number
          stage_index?: number | null
          stage_name?: string | null
          tournament_id?: number | null
        }
        Update: {
          id?: number
          stage_index?: number | null
          stage_name?: string | null
          tournament_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mappools_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          commentator1_id: number | null
          commentator2_id: number | null
          id: number
          match_time: string | null
          mp_id: number | null
          referee_id: number | null
          streamer_id: number | null
          team1_id: number | null
          team1_score: number | null
          team2_id: number | null
          team2_score: number | null
          tournament_id: number | null
        }
        Insert: {
          commentator1_id?: number | null
          commentator2_id?: number | null
          id: number
          match_time?: string | null
          mp_id?: number | null
          referee_id?: number | null
          streamer_id?: number | null
          team1_id?: number | null
          team1_score?: number | null
          team2_id?: number | null
          team2_score?: number | null
          tournament_id?: number | null
        }
        Update: {
          commentator1_id?: number | null
          commentator2_id?: number | null
          id?: number
          match_time?: string | null
          mp_id?: number | null
          referee_id?: number | null
          streamer_id?: number | null
          team1_id?: number | null
          team1_score?: number | null
          team2_id?: number | null
          team2_score?: number | null
          tournament_id?: number | null
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
      referees: {
        Row: {
          id: number
          tournament_id: number | null
          user_id: number | null
        }
        Insert: {
          id: number
          tournament_id?: number | null
          user_id?: number | null
        }
        Update: {
          id?: number
          tournament_id?: number | null
          user_id?: number | null
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
          registered_at: string | null
          tournament_id: number | null
          user_id: number | null
        }
        Insert: {
          id: number
          registered_at?: string | null
          tournament_id?: number | null
          user_id?: number | null
        }
        Update: {
          id?: number
          registered_at?: string | null
          tournament_id?: number | null
          user_id?: number | null
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
          end_time: string | null
          id: number
          mappool_map_id: number | null
          mods: number | null
          score: number | null
          team_player_id: number | null
          tournament_id: number | null
        }
        Insert: {
          end_time?: string | null
          id: number
          mappool_map_id?: number | null
          mods?: number | null
          score?: number | null
          team_player_id?: number | null
          tournament_id?: number | null
        }
        Update: {
          end_time?: string | null
          id?: number
          mappool_map_id?: number | null
          mods?: number | null
          score?: number | null
          team_player_id?: number | null
          tournament_id?: number | null
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
          tournament_id: number | null
          user_id: number | null
        }
        Insert: {
          id: number
          tournament_id?: number | null
          user_id?: number | null
        }
        Update: {
          id?: number
          tournament_id?: number | null
          user_id?: number | null
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
          team_id: number | null
          user_id: number | null
        }
        Insert: {
          id: number
          team_id?: number | null
          user_id?: number | null
        }
        Update: {
          id?: number
          team_id?: number | null
          user_id?: number | null
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
          name: string | null
          tournament_id: number | null
        }
        Insert: {
          id: number
          name?: string | null
          tournament_id?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          tournament_id?: number | null
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
      tournaments: {
        Row: {
          acronym: string | null
          id: number
          name: string | null
          team_size: number | null
        }
        Insert: {
          acronym?: string | null
          id: number
          name?: string | null
          team_size?: number | null
        }
        Update: {
          acronym?: string | null
          id?: number
          name?: string | null
          team_size?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          id: number
          osu_id: number | null
          username: string | null
        }
        Insert: {
          id: number
          osu_id?: number | null
          username?: string | null
        }
        Update: {
          id?: number
          osu_id?: number | null
          username?: string | null
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
      [_ in never]: never
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
