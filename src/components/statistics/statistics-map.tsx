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
      format: (val) => val.toFixed(2),
    },
    percentMax: {
      header: "Percent Max",
      format: (val) => val.toFixed(2),
    },
    percentDifference: {
      header: "Percent Difference",
      format: (val) => val.toFixed(2),
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
    <div className="overflow-auto">
      <table className="w-full border-collapse bg-gray-900 text-white">
        <thead>
          <tr className="border-b border-gray-700">
            {headers.map((h, i) => (
              <th
                className="cursor-pointer border border-gray-700 px-5 py-2 text-center hover:bg-gray-800"
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
              <td className="border border-gray-700 text-center">{i + 1}</td>
              {headers.map((h) => {
                const key = keys.find(
                  (col): col is keyof MapStatsEntry =>
                    columns[col].header === h,
                );
                if (!key) return null;

                const value = plr[key];
                const column = columns[key] as Column<typeof value>;

                const formattedValue = column.format
                  ? column.format(value)
                  : value;

                return (
                  <td
                    key={h}
                    className="px-5| border border-gray-700 py-2 text-center"
                  >
                    {formattedValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
