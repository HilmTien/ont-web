alter table "public"."matches" add column "team1_label" text;

alter table "public"."matches" add column "team2_label" text;

alter table "public"."matches" alter column "team1_id" drop not null;

alter table "public"."matches" alter column "team2_id" drop not null;