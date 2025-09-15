alter table "public"."users" add column "badges" smallint;

alter table "public"."users" add column "country_code" text;

alter table "public"."users" add column "is_restricted" boolean not null;

alter table "public"."users" add column "tournament_badges" smallint;

alter table "public"."users" add column "rank" integer;

alter table "public"."users" add column "accuracy" real;

alter table "public"."users" add column "maximum_combo" integer;

alter table "public"."users" add column "play_count" integer;

alter table "public"."users" add column "pp" real;