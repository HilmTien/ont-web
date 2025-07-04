import { MapStatistics, MapStatsEntry } from "@/lib/statistics/interfaces";
import React from "react";

interface StatisticsMapProps {
  map: string;
  mapStats: MapStatistics;
}

type Keys = keyof MapStatsEntry;

type Column<T> = {
  header: string;
  format?: (val: T) => string;
};

type Columns = {
  [K in Keys]: Column<MapStatsEntry[K]>;
};

export function StatisticsMap({ map, mapStats }: StatisticsMapProps) {
  const [header, setHeader] = React.useState(2);
  const [asc, setAsc] = React.useState(true);

  const headers = [
    "Rang",
    "Spiller",
    "Map Placement",
    "Z-score",
    "Percent Max",
    "Percent Difference",
    "Score",
  ];

  const columns: Columns = {
    name: { header: "Spiller" },
    mapPlacement: { header: "Map Placement" },
    zScore: {
      header: "Z-score",
      format: (val) => (Math.round(val * 100) / 100).toFixed(2),
    },
    percentMax: {
      header: "Percent Max",
      format: (val) => (Math.round(val * 100) / 100).toFixed(2),
    },
    percentDifference: {
      header: "Percent Difference",
      format: (val) => (Math.round(val * 100) / 100).toFixed(2),
    },
    score: { header: "Score" },
    osuId: { header: "User ID" },
  };

  function sortHeader(index: number) {
    if (index < 2) return;

    if (header === index) {
      setAsc(!asc);
    } else {
      setHeader(index);

      if (index === 2) {
        setAsc(true);
      } else {
        setAsc(false);
      }
    }
  }

  const table = mapStats[map];

  const headerName = headers[header];
  const keys = Object.keys(columns) as Array<keyof MapStatsEntry>;
  const headerKey = keys.find((col) => columns[col].header === headerName);

  if (headerKey) {
    table.sort((a, b) => {
      const valA = a[headerKey];
      const valB = b[headerKey];

      if (typeof valA === "number" && typeof valB === "number") {
        if (valA === valB) {
          return asc ? b.score - a.score : a.score - b.score;
        }

        return asc ? valA - valB : valB - valA;
      }

      return 0;
    });
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th
              className="cursor-pointer px-5"
              key={i}
              onClick={() => sortHeader(i)}
            >
              {h}
              {header === i ? (asc ? " ^" : " v") : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.map((plr, i) => (
          <tr key={plr.osuId}>
            <td className="text-center">{i + 1}</td>
            {headers.map((h) => {
              const key = keys.find(
                (col): col is keyof MapStatsEntry => columns[col].header === h,
              );
              if (!key) return null;

              const value = plr[key];
              const column = columns[key] as Column<typeof value>;

              const formattedValue = column.format
                ? column.format(value)
                : value;

              return (
                <td key={h} className="text-center">
                  {formattedValue}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
