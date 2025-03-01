

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."beatmaps" (
    "id" integer NOT NULL,
    "name" character varying,
    "artist" character varying,
    "difficulty_name" character varying,
    "mapper" character varying,
    "drain_time" integer,
    "star_rating" double precision,
    "cs" double precision,
    "ar" double precision,
    "od" double precision,
    "hp" double precision,
    "bpm" double precision,
    "osu_id" integer
);


ALTER TABLE "public"."beatmaps" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."commentators" (
    "id" integer NOT NULL,
    "user_id" integer,
    "tournament_id" integer
);


ALTER TABLE "public"."commentators" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."mappool_maps" (
    "id" integer NOT NULL,
    "mappool_id" integer,
    "beatmap_id" integer,
    "map_index" character varying
);


ALTER TABLE "public"."mappool_maps" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."mappools" (
    "id" integer NOT NULL,
    "tournament_id" integer,
    "stage_name" character varying,
    "stage_index" integer
);


ALTER TABLE "public"."mappools" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."matches" (
    "id" integer NOT NULL,
    "tournament_id" integer,
    "match_time" timestamp without time zone,
    "team1_id" integer,
    "team2_id" integer,
    "team1_score" integer,
    "team2_score" integer,
    "referee_id" integer,
    "streamer_id" integer,
    "commentator1_id" integer,
    "commentator2_id" integer,
    "mp_id" integer
);


ALTER TABLE "public"."matches" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."referees" (
    "id" integer NOT NULL,
    "user_id" integer,
    "tournament_id" integer
);


ALTER TABLE "public"."referees" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."registrations" (
    "id" integer NOT NULL,
    "user_id" integer,
    "tournament_id" integer,
    "registered_at" timestamp without time zone
);


ALTER TABLE "public"."registrations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."scores" (
    "id" integer NOT NULL,
    "tournament_id" integer,
    "team_player_id" integer,
    "mappool_map_id" integer,
    "score" integer,
    "mods" integer,
    "end_time" timestamp without time zone
);


ALTER TABLE "public"."scores" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."streamers" (
    "id" integer NOT NULL,
    "user_id" integer,
    "tournament_id" integer
);


ALTER TABLE "public"."streamers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."team_players" (
    "id" integer NOT NULL,
    "team_id" integer,
    "user_id" integer
);


ALTER TABLE "public"."team_players" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."teams" (
    "id" integer NOT NULL,
    "name" character varying,
    "tournament_id" integer
);


ALTER TABLE "public"."teams" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tournaments" (
    "id" integer NOT NULL,
    "name" character varying,
    "acronym" character varying,
    "team_size" integer
);


ALTER TABLE "public"."tournaments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" integer NOT NULL,
    "username" character varying,
    "osu_id" integer
);


ALTER TABLE "public"."users" OWNER TO "postgres";


ALTER TABLE ONLY "public"."beatmaps"
    ADD CONSTRAINT "beatmaps_osu_id_key" UNIQUE ("osu_id");



ALTER TABLE ONLY "public"."beatmaps"
    ADD CONSTRAINT "beatmaps_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."commentators"
    ADD CONSTRAINT "commentators_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."mappool_maps"
    ADD CONSTRAINT "mappool_maps_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."mappools"
    ADD CONSTRAINT "mappools_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."matches"
    ADD CONSTRAINT "matches_mp_id_key" UNIQUE ("mp_id");



ALTER TABLE ONLY "public"."matches"
    ADD CONSTRAINT "matches_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."referees"
    ADD CONSTRAINT "referees_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."registrations"
    ADD CONSTRAINT "registrations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."scores"
    ADD CONSTRAINT "scores_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."streamers"
    ADD CONSTRAINT "streamers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."team_players"
    ADD CONSTRAINT "team_players_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."teams"
    ADD CONSTRAINT "teams_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tournaments"
    ADD CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_osu_id_key" UNIQUE ("osu_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_username_key" UNIQUE ("username");



ALTER TABLE ONLY "public"."commentators"
    ADD CONSTRAINT "commentators_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id");



ALTER TABLE ONLY "public"."commentators"
    ADD CONSTRAINT "commentators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."mappool_maps"
    ADD CONSTRAINT "mappool_maps_beatmap_id_fkey" FOREIGN KEY ("beatmap_id") REFERENCES "public"."beatmaps"("id");



ALTER TABLE ONLY "public"."mappool_maps"
    ADD CONSTRAINT "mappool_maps_mappool_id_fkey" FOREIGN KEY ("mappool_id") REFERENCES "public"."mappools"("id");



ALTER TABLE ONLY "public"."mappools"
    ADD CONSTRAINT "mappools_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id");



ALTER TABLE ONLY "public"."matches"
    ADD CONSTRAINT "matches_commentator1_id_fkey" FOREIGN KEY ("commentator1_id") REFERENCES "public"."commentators"("id");



ALTER TABLE ONLY "public"."matches"
    ADD CONSTRAINT "matches_commentator2_id_fkey" FOREIGN KEY ("commentator2_id") REFERENCES "public"."commentators"("id");



ALTER TABLE ONLY "public"."matches"
    ADD CONSTRAINT "matches_referee_id_fkey" FOREIGN KEY ("referee_id") REFERENCES "public"."referees"("id");



ALTER TABLE ONLY "public"."matches"
    ADD CONSTRAINT "matches_streamer_id_fkey" FOREIGN KEY ("streamer_id") REFERENCES "public"."streamers"("id");



ALTER TABLE ONLY "public"."matches"
    ADD CONSTRAINT "matches_team1_id_fkey" FOREIGN KEY ("team1_id") REFERENCES "public"."teams"("id");



ALTER TABLE ONLY "public"."matches"
    ADD CONSTRAINT "matches_team2_id_fkey" FOREIGN KEY ("team2_id") REFERENCES "public"."teams"("id");



ALTER TABLE ONLY "public"."matches"
    ADD CONSTRAINT "matches_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id");



ALTER TABLE ONLY "public"."referees"
    ADD CONSTRAINT "referees_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id");



ALTER TABLE ONLY "public"."referees"
    ADD CONSTRAINT "referees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."registrations"
    ADD CONSTRAINT "registrations_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id");



ALTER TABLE ONLY "public"."registrations"
    ADD CONSTRAINT "registrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."scores"
    ADD CONSTRAINT "scores_mappool_map_id_fkey" FOREIGN KEY ("mappool_map_id") REFERENCES "public"."mappool_maps"("id");



ALTER TABLE ONLY "public"."scores"
    ADD CONSTRAINT "scores_team_player_id_fkey" FOREIGN KEY ("team_player_id") REFERENCES "public"."team_players"("id");



ALTER TABLE ONLY "public"."scores"
    ADD CONSTRAINT "scores_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id");



ALTER TABLE ONLY "public"."streamers"
    ADD CONSTRAINT "streamers_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id");



ALTER TABLE ONLY "public"."streamers"
    ADD CONSTRAINT "streamers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."team_players"
    ADD CONSTRAINT "team_players_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id");



ALTER TABLE ONLY "public"."team_players"
    ADD CONSTRAINT "team_players_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."teams"
    ADD CONSTRAINT "teams_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id");





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



































































































































































































GRANT ALL ON TABLE "public"."beatmaps" TO "anon";
GRANT ALL ON TABLE "public"."beatmaps" TO "authenticated";
GRANT ALL ON TABLE "public"."beatmaps" TO "service_role";



GRANT ALL ON TABLE "public"."commentators" TO "anon";
GRANT ALL ON TABLE "public"."commentators" TO "authenticated";
GRANT ALL ON TABLE "public"."commentators" TO "service_role";



GRANT ALL ON TABLE "public"."mappool_maps" TO "anon";
GRANT ALL ON TABLE "public"."mappool_maps" TO "authenticated";
GRANT ALL ON TABLE "public"."mappool_maps" TO "service_role";



GRANT ALL ON TABLE "public"."mappools" TO "anon";
GRANT ALL ON TABLE "public"."mappools" TO "authenticated";
GRANT ALL ON TABLE "public"."mappools" TO "service_role";



GRANT ALL ON TABLE "public"."matches" TO "anon";
GRANT ALL ON TABLE "public"."matches" TO "authenticated";
GRANT ALL ON TABLE "public"."matches" TO "service_role";



GRANT ALL ON TABLE "public"."referees" TO "anon";
GRANT ALL ON TABLE "public"."referees" TO "authenticated";
GRANT ALL ON TABLE "public"."referees" TO "service_role";



GRANT ALL ON TABLE "public"."registrations" TO "anon";
GRANT ALL ON TABLE "public"."registrations" TO "authenticated";
GRANT ALL ON TABLE "public"."registrations" TO "service_role";



GRANT ALL ON TABLE "public"."scores" TO "anon";
GRANT ALL ON TABLE "public"."scores" TO "authenticated";
GRANT ALL ON TABLE "public"."scores" TO "service_role";



GRANT ALL ON TABLE "public"."streamers" TO "anon";
GRANT ALL ON TABLE "public"."streamers" TO "authenticated";
GRANT ALL ON TABLE "public"."streamers" TO "service_role";



GRANT ALL ON TABLE "public"."team_players" TO "anon";
GRANT ALL ON TABLE "public"."team_players" TO "authenticated";
GRANT ALL ON TABLE "public"."team_players" TO "service_role";



GRANT ALL ON TABLE "public"."teams" TO "anon";
GRANT ALL ON TABLE "public"."teams" TO "authenticated";
GRANT ALL ON TABLE "public"."teams" TO "service_role";



GRANT ALL ON TABLE "public"."tournaments" TO "anon";
GRANT ALL ON TABLE "public"."tournaments" TO "authenticated";
GRANT ALL ON TABLE "public"."tournaments" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
