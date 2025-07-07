"use client";

import {
  defaultMapData,
  MapStatistics,
  OverallStatistics,
} from "@/lib/statistics/interfaces";
import { StatisticsQueryData } from "@/lib/statistics/query";
import Image from "next/image";
import React from "react";
import { StatisticsMap } from "./statistics-map";
import { StatisticsOverall } from "./statistics-overall";

interface StatisticsViewProps {
  mapStats: MapStatistics;
  overallStats: OverallStatistics;
  statistics: StatisticsQueryData;
}

interface MapInfoData {
  artist: string;
  songName: string;
  difficulty: string;
  cover: string;
}

export function StatisticsView({
  mapStats,
  overallStats,
  statistics,
}: StatisticsViewProps) {
  const [map, setMap] = React.useState("Overall");

  const beatmap = statistics.tournament_stages[0].mappool_maps.find(
    (m) => m.map_index === map,
  )?.beatmaps;

  const mapData = beatmap
    ? {
        artist: beatmap.artist,
        songName: beatmap.name,
        difficulty: beatmap.difficulty_name,
        cover: beatmap.cover,
      }
    : defaultMapData;

  if (!mapData.cover || mapData.cover.endsWith("cover.jpg?0")) {
    mapData.cover = "/beatmaps/default-bg.png";
  }

  const mapButtons = [
    <button
      key="overall"
      className="cursor-pointer"
      type="button"
      onClick={() => setMap("Overall")}
    >
      Overall
    </button>,
    ...Object.keys(mapStats).map((mapKey) => (
      <button
        key={mapKey}
        className="cursor-pointer"
        onClick={() => setMap(mapKey)}
      >
        {mapKey}
      </button>
    )),
  ];

  return (
    <div className={!statistics.tournament_stages[0].is_public ? "hidden" : ""}>
      <div className="mb-5 flex gap-2">{mapButtons}</div>

      <div className={map === "Overall" ? "hidden" : "mb-5 flex flex-col"}>
        <p>
          {`${mapData.artist} - ${mapData.songName} [${mapData.difficulty}]`}{" "}
        </p>
        <Image
          src={mapData.cover}
          alt="Beatmap Image"
          width="0"
          height="0"
          sizes="100vw"
          className="w-96"
        ></Image>
      </div>
      {map === "Overall" ? (
        <StatisticsOverall stats={overallStats} />
      ) : (
        <StatisticsMap map={map} mapStats={mapStats} />
      )}
    </div>
  );
}
