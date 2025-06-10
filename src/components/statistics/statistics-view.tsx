"use client";

import { MapEntry, Statistics } from "@/lib/statistics/interfaces";
import Image from "next/image";
import React from "react";

interface StatisticsViewProps {
  teamStats: Statistics;
  playerStats: Statistics;
  teamSize: number | null;
  mapIndexes: MapEntry;
}

interface InstanceEntry {
  name: string;
  "Z-score": number;
  Placements: number;
  "Percent Max": number;
  "Percent Difference": number;
  Score: number;
  "Average Score": number;
}

function getHeaders(map: string, view: string): string[] {
  const headers = [
    "Rang",
    view,
    "Map Placement",
    "Z-score",
    "Percent Max",
    "Percent Difference",
    "Score",
  ];

  if (map === "Overall") {
    return [
      "Rang",
      view,
      "Sum of Placements",
      "Z-sum",
      "Percent Max",
      "Percent Difference",
      "Score",
      "Average Score",
    ];
  }

  return view === "Lag" ? [...headers, "Average Score"] : headers;
}

function getColumnKeyMap(view: string): Record<string, keyof InstanceEntry> {
  return {
    "Z-sum": "Z-score",
    "Z-score": "Z-score",
    "Sum of Placements": "Placements",
    "Map Placement": "Placements",
    "Percent Max": "Percent Max",
    "Percent Difference": "Percent Difference",
    Score: "Score",
    "Average Score": "Average Score",
    [view]: "name",
  };
}

function sortTableData(
  data: InstanceEntry[],
  column: string | null,
  ascending: boolean,
  view: string,
): InstanceEntry[] {
  if (!column) return data;

  const keyMap = getColumnKeyMap(view);
  const dataKey = keyMap[column];

  if (!dataKey || dataKey === "name") return data;

  return [...data].sort((a, b) => {
    const aVal = a[dataKey];
    const bVal = b[dataKey];

    return ascending ? aVal - bVal : bVal - aVal;
  });
}

export function StatisticsView({
  teamStats,
  playerStats,
  teamSize,
  mapIndexes,
}: StatisticsViewProps) {
  const [view, setView] = React.useState<"Lag" | "Spiller">(
    teamSize === 1 ? "Spiller" : "Lag",
  );
  const [map, setMap] = React.useState("Overall");
  const [tableHead, setTableHead] = React.useState<string[]>([]);
  const [tableBody, setTableBody] = React.useState<InstanceEntry[]>([]);
  const [mapData, setMapData] = React.useState<string[]>([
    "",
    "",
    "",
    "/beatmaps/default-bg.png",
  ]);
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sort, setSort] = React.useState(true);

  React.useEffect(() => {
    setTableHead(getHeaders(map, view));

    const defaultColumn =
      map === "Overall" ? "Sum of Placements" : "Map Placement";
    setSortColumn(defaultColumn);
    setSort(true);

    const stats = view === "Lag" ? teamStats : playerStats;
    const instances: Record<string, InstanceEntry> = {};
    const maps =
      map === "Overall" ? Object.keys(stats) : [map].filter((m) => m in stats);

    for (const mapKey of maps) {
      for (const {
        name,
        score,
        mapPlacement,
        percentMax,
        percentDifference,
        zScore,
      } of stats[mapKey]) {
        if (!instances[name]) {
          instances[name] = {
            name,
            "Z-score": 0,
            Placements: 0,
            "Percent Max": 0,
            "Percent Difference": 0,
            Score: 0,
            "Average Score": 0,
          };
        }

        const entry = instances[name];
        entry["Z-score"] += zScore;
        entry.Placements += mapPlacement;
        entry["Percent Max"] += percentMax;
        entry["Percent Difference"] += percentDifference;
        entry.Score += score;
      }
    }

    const numberOfMaps = maps.length;

    for (const name in instances) {
      const entry = instances[name];
      entry["Average Score"] =
        map === "Overall"
          ? entry.Score / numberOfMaps
          : teamSize
            ? entry.Score / teamSize
            : entry.Score;
    }
    const data = Object.values(instances);

    setTableBody(sortTableData(data, defaultColumn, true, view));

    const mapInfo = mapIndexes[map];

    if (!mapInfo) {
      setMapData(["", "", "", "/beatmaps/default-bg.png"]);
      return;
    }

    if (!mapInfo.cover || mapInfo.cover.endsWith("cover.jpg?0")) {
      mapInfo.cover = "/beatmaps/default-bg.png";
    }

    setMapData([
      mapInfo.artist,
      mapInfo.name,
      mapInfo.difficulty_name,
      mapInfo.cover,
    ]);
  }, [view, map, mapIndexes, playerStats, teamSize, teamStats]);

  React.useEffect(() => {
    setTableBody((prev) => sortTableData([...prev], sortColumn, sort, view));
  }, [sortColumn, sort, view]);

  const headerClick = (column: string) => {
    if (column === "Rang" || column === "Lag" || column === "Spiller") return;

    if (sortColumn === column) {
      setSort(!sort);
    } else {
      setSortColumn(column);
      setSort(false);
    }
  };

  const mapButtons = [
    <button
      key="overall"
      className="cursor-pointer"
      type="button"
      onClick={() => setMap("Overall")}
    >
      Overall
    </button>,
    ...Object.keys(teamStats).map((mapKey) => (
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
    <div>
      <div className={teamSize === 1 ? "hidden" : "mb-5 flex gap-5"}>
        <button className="cursor-pointer" onMouseDown={() => setView("Lag")}>
          Lagvisning
        </button>
        <button
          className="cursor-pointer"
          onMouseDown={() => setView("Spiller")}
        >
          Spillervisning
        </button>
      </div>

      <div className="mb-5 flex gap-2">{mapButtons}</div>

      <div className={map === "Overall" ? "hidden" : "mb-5 flex flex-col"}>
        <p>{`${mapData[0]} - ${mapData[1]} [${mapData[2]}]`} </p>
        <Image
          src={mapData[3]}
          alt="Beatmap Image"
          width="0"
          height="0"
          sizes="100vw"
          className="w-96"
        ></Image>
      </div>

      <table>
        <thead>
          <tr>
            {tableHead.map((h, i) => (
              <th
                className="cursor-pointer px-5"
                key={i}
                onClick={() => headerClick(h)}
              >
                {h}
                {sortColumn === h ? (sort ? " v" : " ^") : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBody.map((b, i) => (
            <tr key={i}>
              <td className="text-center">{i + 1}</td>
              <td className="text-center">{b.name}</td>
              <td className="text-center">{b.Placements}</td>
              <td className="text-center">
                {Math.round(b["Z-score"] * 100) / 100}
              </td>
              <td className="text-center">
                {Math.round(b["Percent Max"] * 100) / 100}
              </td>
              <td className="text-center">
                {Math.round(b["Percent Difference"] * 100) / 100}
              </td>
              <td className="text-center">{b.Score}</td>
              <td className="text-center">
                {view === "Lag" || map === "Overall"
                  ? Math.floor(b["Average Score"])
                  : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
