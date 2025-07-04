"use client";

import { MapStatistics, OverallStatistics } from "@/lib/statistics/interfaces";
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
  const [mapData, setMapData] = React.useState<MapInfoData>({
    artist: "",
    songName: "",
    difficulty: "",
    cover: "/beatmaps/default-bg.png",
  });

  React.useMemo(() => {
    const beatmap = statistics.tournament_stages[0].mappool_maps.find(
      (m) => m.map_index === map,
    );

    if (!beatmap) {
      setMapData({
        artist: "",
        songName: "",
        difficulty: "",
        cover: "/beatmaps/default-bg.png",
      });
      return;
    }

    const mapInfo = beatmap.beatmaps;

    if (!mapInfo.cover || mapInfo.cover.endsWith("cover.jpg?0")) {
      mapInfo.cover = "/beatmaps/default-bg.png";
    }

    setMapData({
      artist: mapInfo.artist,
      songName: mapInfo.name,
      difficulty: mapInfo.difficulty_name,
      cover: mapInfo.cover,
    });
  }, [map, statistics.tournament_stages]);

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
