create type "public"."bracket_types" as enum ('swiss', 'singleelim');

alter table "public"."tournament_stages" add column "bracket_type" bracket_types;