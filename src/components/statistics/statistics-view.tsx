"use client";

import { MapStatistics, OverallStatistics } from "@/lib/statistics/interfaces";
import { StatisticsQueryData } from "@/lib/statistics/query";
import Image from "next/image";
import React from "react";
import { StatisticsMap } from "./statistics-map";
import { StatisticsOverall } from "./statistics-overall";
import Link from "next/link";

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
};

export function StatisticsView({
  mapStats,
  overallStats,
  statistics,
}: StatisticsViewProps) {
  const [map, setMap] = React.useState("Overall");

  const beatmap = statistics.mappool_maps.find(
    (m) => m.map_index === map,
  )?.beatmaps;

  const mapData = beatmap
    ? {
        artist: beatmap.artist,
        songName: beatmap.name,
        difficulty: beatmap.difficulty_name,
        mapper: beatmap.mapper,
        cover: beatmap.cover,
        osuId: beatmap.osu_id,
      }
    : defaultMapData;

  if (!mapData.cover || mapData.cover.endsWith("cover.jpg?0")) {
    mapData.cover = "/beatmaps/default-bg.png";
  }

  const mapButtons = [
    <button
      key="overall"
      className="focus: focus:bg-accent cursor-pointer rounded bg-gray-900 px-4 py-2 hover:bg-gray-800"
      type="button"
      onClick={() => setMap("Overall")}
    >
      Overall
    </button>,
    ...Object.keys(mapStats).map((mapKey) => (
      <button
        key={mapKey}
        className="focus:bg-accent cursor-pointer rounded bg-gray-900 px-4 py-2 hover:bg-gray-800"
        onClick={() => setMap(mapKey)}
      >
        {mapKey}
      </button>
    )),
  ];

  return (
    <div className={!statistics.is_public ? "hidden" : ""}>
      <div className="mb-5 flex gap-2 pb-2">{mapButtons}</div>

      <div
        className={
          map === "Overall"
            ? "hidden"
            : "shadow-container mb-8 flex flex-col items-center justify-between md:flex-row"
        }
      >
        <div className="p-5">
          <p className="text-[1.5rem] font-bold">
            {`${mapData.artist} - ${mapData.songName} [${mapData.difficulty}]`}{" "}
          </p>
          <p className="mt-2 text-xl">{mapData.mapper}</p>
        </div>

        <div className="flex max-w-[50%]">
          <Link href={`https://osu.ppy.sh/b/${mapData.osuId}`}>
            <Image
              src={mapData.cover}
              alt="Beatmap Image"
              width="0"
              height="0"
              sizes="100vw"
              className="w-full"
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
