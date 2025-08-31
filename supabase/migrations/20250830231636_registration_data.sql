alter table "public"."users" add column "badges" smallint;

alter table "public"."users" add column "country_code" text;

alter table "public"."users" add column "is_restricted" boolean not null;

alter table "public"."users" add column "tournament_badges" smallint;