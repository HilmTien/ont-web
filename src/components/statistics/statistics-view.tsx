"use client";

import { MapStatistics, OverallStatistics } from "@/lib/statistics/interfaces";
import { StatisticsQueryData } from "@/lib/statistics/query";
import { formatSecondsToMMSS } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Select } from "radix-ui";
import React from "react";
import Clock from "../icons/clock";
import MusicNote from "../icons/music-note";
import Star from "../icons/star";
import { StatisticsMap } from "./statistics-map";
import { StatisticsOverall } from "./statistics-overall";

interface StatisticsViewProps {
  mapStats: MapStatistics;
  overallStats: OverallStatistics;
  statistics: StatisticsQueryData;
}

const defaultMapData = {
  artist: "",
  songName: "",
  difficulty: "",
  mapper: "",
  cover: "/beatmaps/default-bg.png",
  osuId: "",
  starRating: 0,
  drainTime: 0,
  bpm: 0,
  cs: 0,
  ar: 0,
  hp: 0,
  od: 0,
  mods: "",
};

export function StatisticsView({
  mapStats,
  overallStats,
  statistics,
}: StatisticsViewProps) {
  const [map, setMap] = React.useState("Overall");

  const mappoolMap = statistics.mappool_maps.find((m) => m.map_index === map);

  const beatmap = mappoolMap?.beatmaps;

  const mapData = beatmap
    ? {
        artist: beatmap.artist,
        songName: beatmap.name,
        difficulty: beatmap.difficulty_name,
        mapper: beatmap.mapper,
        cover: beatmap.cover,
        osuId: beatmap.osu_id,
        starRating: beatmap.star_rating,
        drainTime: beatmap.drain_time,
        bpm: beatmap.bpm,
        cs: beatmap.cs,
        ar: beatmap.ar,
        hp: beatmap.hp,
        od: beatmap.od,
        mods: mappoolMap.mods,
      }
    : defaultMapData;

  if (!mapData.cover || mapData.cover.endsWith("cover.jpg?0")) {
    mapData.cover = "/beatmaps/default-bg.png";
  }

  const mapButtons = [
    <button
      key="overall"
      className={`cursor-pointer rounded px-4 py-2 ${map === "Overall" ? "bg-accent" : "bg-table hover:bg-gray-800"}`}
      type="button"
      onClick={() => setMap("Overall")}
    >
      Overall
    </button>,
    ...Object.keys(mapStats).map((mapKey) => (
      <button
        key={mapKey}
        className={`cursor-pointer rounded px-4 py-2 ${map === mapKey ? "bg-accent" : "bg-table hover:bg-gray-800"}`}
        onClick={() => setMap(mapKey)}
      >
        {mapKey}
      </button>
    )),
  ];

  return (
    <div className={!statistics.is_public ? "hidden" : ""}>
      <div className="mt-5 hidden gap-2 pb-2 lg:flex">{mapButtons}</div>
      <Select.Root defaultValue={map} onValueChange={(m) => setMap(m)}>
        <Select.Trigger className="my-2 w-16 cursor-pointer rounded-md bg-gray-900 p-2 lg:hidden">
          <Select.Value>{map}</Select.Value>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="min-w-48 rounded-md"
            position="popper"
            sideOffset={5}
          >
            <Select.Viewport className="shadow-container rounded-md bg-gray-900 p-[5px]">
              <Select.Item
                key="overall"
                value="Overall"
                className={`hover:bg-accent cursor-pointer rounded-md bg-gray-900 py-[2px] pl-1 ${map === "Overall" ? "font-semibold" : ""}`}
              >
                <Select.ItemText>Overall</Select.ItemText>
              </Select.Item>
              {...Object.keys(mapStats).map((mapKey) => (
                <Select.Item
                  key={mapKey}
                  value={mapKey}
                  className={`hover:bg-accent cursor-pointer rounded-md bg-gray-900 py-[2px] pl-1 ${map === mapKey ? "font-semibold" : ""}`}
                >
                  {mapKey}
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <div
        className={
          map === "Overall"
            ? "hidden"
            : "shadow-container bg-card mb-8 flex flex-col justify-between rounded-md lg:flex-row"
        }
      >
        <div className="flex flex-col justify-between px-5 lg:max-w-[50%]">
          <div>
            <div className="mt-5 lg:mt-10">
              <p className="overflow-hidden text-lg font-bold text-ellipsis lg:text-[1.5rem]">
                {`${mapData.artist} - ${mapData.songName} [${mapData.difficulty}]`}{" "}
              </p>
              <p className="text-md mt-2">{mapData.mapper}</p>
            </div>
          </div>
          <div className="mb-2 flex flex-col text-lg lg:flex-row lg:gap-12">
            <div className="flex gap-7 pb-2">
              <div className="flex flex-row gap-2 text-sm lg:text-lg">
                <p className="flex items-center gap-1">
                  <Star className="stroke-accent" /> {mapData.starRating}
                </p>
                <p className="flex items-center gap-1">
                  <Clock className="stroke-accent" />{" "}
                  {formatSecondsToMMSS(mapData.drainTime)}
                </p>
                <p className="flex items-center gap-1">
                  <MusicNote className="stroke-accent" /> {mapData.bpm}
                </p>
              </div>
            </div>
            <div className="flex gap-2 text-sm text-nowrap lg:text-lg">
              <p>
                <span className="text-accent font-semibold">CS</span>{" "}
                {mapData.cs}
              </p>
              <p>
                <span className="text-accent font-semibold">AR</span>{" "}
                {mapData.ar}
              </p>
              <p>
                <span className="text-accent font-semibold">HP</span>{" "}
                {mapData.hp}
              </p>
              <p>
                <span className="text-accent font-semibold">OD</span>{" "}
                {mapData.od}
              </p>
            </div>

            <p className="text-sm lg:text-lg">{mapData.mods}</p>
          </div>
        </div>

        <div className="lg:max-w-[50%]">
          <Link target="_blank" href={`https://osu.ppy.sh/b/${mapData.osuId}`}>
            <Image
              src={mapData.cover}
              alt="Beatmap Image"
              width="0"
              height="0"
              sizes="100vw"
              className="w-[150%] items-center lg:w-full lg:rounded-r-md"
            ></Image>
          </Link>
        </div>
      </div>
      {map === "Overall" ? (
        <StatisticsOverall stats={overallStats} />
      ) : (
        <StatisticsMap map={map} mapStats={mapStats} />
      )}
    </div>
  );
}
