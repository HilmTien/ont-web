alter table "public"."beatmaps" alter column "last_updated" set data type timestamp with time zone using "last_updated"::timestamp with time zone;

alter table "public"."tournament_stages" add column "is_public" boolean not null default false;