alter table "public"."beatmaps" alter column "ar" set data type real using "ar"::real;

alter table "public"."beatmaps" alter column "artist" set not null;

alter table "public"."beatmaps" alter column "artist" set data type text using "artist"::text;

alter table "public"."beatmaps" alter column "bpm" set not null;

alter table "public"."beatmaps" alter column "bpm" set data type real using "bpm"::real;

alter table "public"."beatmaps" alter column "cs" set data type real using "cs"::real;

alter table "public"."beatmaps" alter column "difficulty_name" set not null;

alter table "public"."beatmaps" alter column "difficulty_name" set data type text using "difficulty_name"::text;

alter table "public"."beatmaps" alter column "drain_time" set not null;

alter table "public"."beatmaps" alter column "hp" set data type real using "hp"::real;

alter table "public"."beatmaps" alter column "mapper" set not null;

alter table "public"."beatmaps" alter column "mapper" set data type text using "mapper"::text;

alter table "public"."beatmaps" alter column "name" set not null;

alter table "public"."beatmaps" alter column "name" set data type text using "name"::text;

alter table "public"."beatmaps" alter column "od" set data type real using "od"::real;

alter table "public"."beatmaps" alter column "star_rating" set not null;

alter table "public"."beatmaps" alter column "star_rating" set data type real using "star_rating"::real;

alter table "public"."commentators" alter column "tournament_id" set not null;

alter table "public"."commentators" alter column "user_id" set not null;

alter table "public"."mappool_maps" alter column "beatmap_id" set not null;

alter table "public"."mappool_maps" alter column "map_index" set not null;

alter table "public"."mappool_maps" alter column "map_index" set data type text using "map_index"::text;

alter table "public"."mappool_maps" alter column "mappool_id" set not null;

alter table "public"."mappools" alter column "stage_index" set not null;

alter table "public"."mappools" alter column "stage_name" set not null;

alter table "public"."mappools" alter column "stage_name" set data type text using "stage_name"::text;

alter table "public"."mappools" alter column "tournament_id" set not null;

alter table "public"."matches" add column "tournament_match_id" integer not null;

alter table "public"."matches" alter column "match_time" set not null;

alter table "public"."matches" alter column "match_time" set data type timestamp with time zone using "match_time"::timestamp with time zone;

alter table "public"."matches" alter column "team1_id" set not null;

alter table "public"."matches" alter column "team2_id" set not null;

alter table "public"."matches" alter column "tournament_id" set not null;

alter table "public"."referees" alter column "tournament_id" set not null;

alter table "public"."referees" alter column "user_id" set not null;

alter table "public"."registrations" alter column "registered_at" set not null;

alter table "public"."registrations" alter column "registered_at" set data type timestamp with time zone using "registered_at"::timestamp with time zone;

alter table "public"."registrations" alter column "tournament_id" set not null;

alter table "public"."registrations" alter column "user_id" set not null;

alter table "public"."scores" add column "accuracy" real not null;

alter table "public"."scores" alter column "end_time" set not null;

alter table "public"."scores" alter column "end_time" set data type timestamp with time zone using "end_time"::timestamp with time zone;

alter table "public"."scores" alter column "mappool_map_id" set not null;

alter table "public"."scores" alter column "mods" set not null;

alter table "public"."scores" alter column "score" set not null;

alter table "public"."scores" alter column "team_player_id" set not null;

alter table "public"."scores" alter column "tournament_id" set not null;

alter table "public"."streamers" alter column "tournament_id" set not null;

alter table "public"."streamers" alter column "user_id" set not null;

alter table "public"."team_players" alter column "team_id" set not null;

alter table "public"."team_players" alter column "user_id" set not null;

alter table "public"."teams" alter column "name" set not null;

alter table "public"."teams" alter column "name" set data type text using "name"::text;

alter table "public"."teams" alter column "tournament_id" set not null;

alter table "public"."tournaments" alter column "acronym" set not null;

alter table "public"."tournaments" alter column "acronym" set data type text using "acronym"::text;

alter table "public"."tournaments" alter column "name" set not null;

alter table "public"."tournaments" alter column "name" set data type text using "name"::text;

alter table "public"."users" alter column "osu_id" set not null;

alter table "public"."users" alter column "username" set not null;

alter table "public"."users" alter column "username" set data type text using "username"::text;