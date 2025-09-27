import { MapStatistics, MapStatsEntry } from "@/lib/statistics/interfaces";
import { intToMods } from "@/lib/statistics/utils";
import React from "react";

interface StatisticsMapProps {
  map: string;
  mapStats: MapStatistics;
  bestMapStats: MapStatistics;
  mods: string | null;
}

type Keys = keyof MapStatsEntry;

type Column<T> = {
  header: string;
  format?: (val: T) => string;
};

type Columns = {
  [K in Keys]: Column<MapStatsEntry[K]>;
};

export function StatisticsMap({
  map,
  mapStats,
  bestMapStats,
  mods,
}: StatisticsMapProps) {
  const [header, setHeader] = React.useState(2);
  const [asc, setAsc] = React.useState(true);
  const [best, setBest] = React.useState(true);

  const headers = [
    "Rang",
    "Spiller",
    "Map Placement",
    "Z-score",
    "Percent Max",
    "Percent Difference",
    "Score",
  ];

  if (mods === "FM") {
    headers.push("Mods");
  }

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
    mods: { header: "Mods", format: (val) => intToMods(val - 1).join("") },
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

  const table = best ? bestMapStats[map] : mapStats[map];

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
      <div className="mb-2 flex gap-2">
        <input
          type="checkbox"
          checked={best}
          onChange={() => setBest(!best)}
        ></input>
        <p>Vis kun beste scores</p>
      </div>
      <table className="bg-table w-full border-collapse text-white">
        <thead>
          <tr className="border-content border-b">
            {headers.map((h, i) => (
              <th
                className="border-content cursor-pointer border px-5 py-2 text-center hover:bg-gray-800"
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
            <tr key={i}>
              <td className="border-content border text-center">{i + 1}</td>
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
                    className="border-content border px-5 py-2 text-center"
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
