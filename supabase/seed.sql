insert into "public"."users"
  (username, osu_id)
values
  ('MockHost', 1),
  ('MockReferee', 2),
  ('MockCommentator', 3),
  ('MockStreamer', 4),
  ('MockPlayer1', 5),
  ('MockPlayer2', 6);

insert into "public"."tournaments"
  (name, acronym, team_size)
values
  ('My osu! Tournament', 'MOT', 1);

insert into "public"."admins"
  (tournament_id, user_id)
values
  (
    (select id from "public"."tournaments" where acronym = 'MOT'),
    (select id from "public"."users" where username = 'MockHost')
  );

insert into "public"."commentators"
  (tournament_id, user_id)
values
  (
    (select id from "public"."tournaments" where acronym = 'MOT'),
    (select id from "public"."users" where username = 'MockCommentator')
  );

insert into "public"."referees"
  (tournament_id, user_id)
values
  (
    (select id from "public"."tournaments" where acronym = 'MOT'),
    (select id from "public"."users" where username = 'MockReferee')
  );

insert into "public"."registrations"
  (tournament_id, user_id)
values
  (
    (select id from "public"."tournaments" where acronym = 'MOT'),
    (select id from "public"."users" where username = 'MockPlayer1')
  ),
  (
    (select id from "public"."tournaments" where acronym = 'MOT'),
    (select id from "public"."users" where username = 'MockPlayer2')
  );

insert into "public"."streamers"
  (tournament_id, user_id)
values
  (
    (select id from "public"."tournaments" where acronym = 'MOT'),
    (select id from "public"."users" where username = 'MockStreamer')
  );

insert into "public"."teams"
  (name, tournament_id)
values
  ('Team 1', (select id from "public"."tournaments" where acronym = 'MOT')),
  ('Team 2', (select id from "public"."tournaments" where acronym = 'MOT'));

insert into "public"."team_players"
  (team_id, user_id)
values
  (
    (select id from "public"."teams" where name = 'Team 1'),
    (select id from "public"."users" where username = 'MockPlayer1')
  ),
  (
    (select id from "public"."teams" where name = 'Team 2'),
    (select id from "public"."users" where username = 'MockPlayer2')
  );

insert into "public"."tournament_stages"
  (tournament_id, stage_name, stage_index, stage_type)
values
  (
    (select id from "public"."tournaments" where acronym = 'MOT'),
    'Qualifiers',
    1,
    'qualifiers'
  ),
  (
    (select id from "public"."tournaments" where acronym = 'MOT'),
    'Week 1',
    2,
    'pvp'
  );

insert into "public"."qualifier_lobbies"
  (tournament_match_id, lobby_time, stage_id)
values
  (
    '1',
    '2025-12-24 12:00:00+00',
    (select id from "public"."tournament_stages" where stage_name = 'Qualifiers')
  );

insert into "public"."matches"
  (tournament_id, match_time, team1_id, team2_id, tournament_match_id, stage_id)
values
  (
    (select id from "public"."tournaments" where acronym = 'MOT'),
    '2025-12-31 12:00:00+00',
    (select id from "public"."teams" where name = 'Team 1'),
    (select id from "public"."teams" where name = 'Team 2'),
    '1',
    (select id from "public"."tournament_stages" where stage_name = 'Week 1')
  );