insert into "public"."users"
  (username, osu_id, is_restricted, country_code, badges, tournament_badges)
values
  ('MockHost', 1, false, 'NO', 0, 0),
  ('MockReferee', 2, false, 'NO', 0, 0),
  ('MockCommentator', 3, false, 'NO', 0, 0),
  ('MockStreamer', 4, false, 'NO', 0, 0),
  ('MockPlayer1', 5, false, 'NO', 0, 0),
  ('MockPlayer2', 6, false, 'NO', 0, 0),
  ('MockPlayer3', 7, false, 'NO', 0, 0),
  ('MockPlayer4', 8, false, 'NO', 0, 0);

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
  ),
    (
    (select id from "public"."tournaments" where acronym = 'MOT'),
    (select id from "public"."users" where username = 'MockPlayer3')
  ),
    (
    (select id from "public"."tournaments" where acronym = 'MOT'),
    (select id from "public"."users" where username = 'MockPlayer4')
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
    (select id from "public"."teams" where name = 'Team 1'),
    (select id from "public"."users" where username = 'MockPlayer2')
  ),
    (
    (select id from "public"."teams" where name = 'Team 2'),
    (select id from "public"."users" where username = 'MockPlayer3')
  ),
    (
    (select id from "public"."teams" where name = 'Team 2'),
    (select id from "public"."users" where username = 'MockPlayer4')
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

insert into "public"."beatmaps"
  (id, name, artist, difficulty_name, mapper, drain_time, star_rating, cs, ar, od, hp, bpm, osu_id, mapset_host, cover, last_updated) 
values 
  (1, 'Hakuraku', 'Camellia feat. Nanahira', 'Defectum''s Oni', 'Defectum', 240, 5.02, 4, 8, 6, 5.5, 222, 4649550, 'Chrisse', 'https://assets.ppy.sh/beatmaps/2197076/covers/cover.jpg?1724356136', '2024-08-22 19:48:40+00'), 
  (2, 'Souhaku Rebellion', 'Genkaku Aria', 'Inner Oni', 'Defectum', 291, 5.9, 2, 8, 7, 5, 200, 4564543, 'Defectum', 'https://assets.ppy.sh/beatmaps/2164121/covers/cover.jpg?1717766937', '2024-06-07 13:28:40+00'), 
  (3, 'Evanescent Edge', 'polysha', 'Final Revolt', 'Defectum', 147, 5.52, 2, 8, 7, 5, 160, 4748496, 'Defectum', 'https://assets.ppy.sh/beatmaps/2226956/covers/cover.jpg?1736984057', '2025-01-15 23:34:04+00'), 
  (4, 'CROSS OVER', 'HyuN feat. LyuU', 'Defectum''s Oni', 'Defectum', 135, 4.83, 2, 10, 6, 5.5, 200, 4110878, 'Nozdormu', 'https://assets.ppy.sh/beatmaps/1972391/covers/cover.jpg?1698894362', '2023-11-02 03:05:48+00');

insert into "public"."mappool_maps"
(id, beatmap_id, map_index, mods, stage_id)
values
(1, 1, 'A1', 'Nomod', 1),
(2, 2, 'A2', 'Nomod', 1),
(4, 3, 'B1', 'Nomod', 1),
(5, 4, 'A3', 'Hardrock', 1);

insert into "public"."scores"
(id, tournament_id, team_player_id, mappool_map_id, score, mods, end_time, accuracy, "100s", "50s", misses, mode)
values
(1, 1, 1, 1, 924600, 0, '2025-06-24 19:57:58+00', 98.76, null, null, null, 0),
(2, 1, 2, 1, 1000000, 0, '2025-06-24 19:59:14+00', 100.00, null, null, null, 0),
(3, 1, 3, 1, 989340, 0, '2025-06-24 20:00:47+00', 99.30, null, null, null, 0),
(4, 1, 4, 1, 935260, 0, '2025-06-24 20:01:44+00', 98.89, null, null, null, 0),
(5, 1, 1, 2, 893025, 0, '2025-06-24 19:57:58+00', 96.4, null, null, null, 0),
(6, 1, 2, 2, 919254, 0, '2025-06-24 19:59:14+00', 98.3, null, null, null, 0),
(7, 1, 3, 2, 967896, 0, '2025-06-24 20:00:47+00', 99.4, null, null, null, 0),
(8, 1, 4, 2, 876545, 0, '2025-06-24 20:01:44+00', 96.1, null, null, null, 0),
(9, 1, 1, 4, 607995, 0, '2025-06-24 19:57:58+00', 93.3, null, null, null, 0),
(10, 1, 2, 4, 607995, 0, '2025-06-24 19:59:14+00', 93.3, null, null, null, 0),
(11, 1, 3, 4, 768923, 0, '2025-06-24 20:00:47+00', 95.4, null, null, null, 0),
(12, 1, 4, 4, 984588, 0, '2025-06-24 20:01:44+00', 99.7, null, null, null, 0),
(13, 1, 1, 5, 1060000, 0, '2025-06-24 19:57:58+00', 100, null, null, null, 0),
(14, 1, 2, 5, 990567, 0, '2025-06-24 19:59:14+00', 98.9, null, null, null, 0),
(15, 1, 3, 5, 967032, 0, '2025-06-24 20:00:47+00', 98.4, null, null, null, 0),
(16, 1, 4, 5, 1012404, 0, '2025-06-24 20:01:44+00', 99.4, null, null, null, 0);