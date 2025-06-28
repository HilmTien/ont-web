import {
  OverallStatistics,
  OverallStatisticsEntry,
} from "@/lib/statistics/interfaces";
import React from "react";

interface StatisticsOverallProps {
  stats: OverallStatistics;
}

type Keys = keyof OverallStatisticsEntry;

type Columns = {
  header: string;
  format?: (val: number) => number;
};

export function StatisticsOverall({ stats }: StatisticsOverallProps) {
  const [header, setHeader] = React.useState(2);
  const [asc, setAsc] = React.useState(true);

  const headers = [
    "Rang",
    "Spiller",
    "Sum of Placements",
    "Z-sum",
    "Percent Max",
    "Percent Difference",
    "Score",
    "Average Score",
  ];

  const columns: Record<Keys, Columns> = {
    name: { header: "Spiller" },
    sumOfPlacements: { header: "Sum of Placements" },
    zSum: {
      header: "Z-sum",
      format: (val: number) => Math.round(val * 100) / 100,
    },
    percentMax: {
      header: "Percent Max",
      format: (val: number) => Math.round(val * 100) / 100,
    },
    percentDifference: {
      header: "Percent Difference",
      format: (val: number) => Math.round(val * 100) / 100,
    },
    score: { header: "Score" },
    avgScore: {
      header: "Average Score",
      format: (val: number) => Math.floor(val),
    },
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

  const table = Object.values(stats);

  const headerName = headers[header];
  const keys = Object.keys(columns) as Array<keyof OverallStatisticsEntry>;
  const headerKey = keys.find((col) => columns[col].header === headerName);

  if (headerKey) {
    table.sort((a, b) => {
      const valA = a[headerKey];
      const valB = b[headerKey];

      if (typeof valA === "number" && typeof valB === "number") {
        if (valA === valB) {
          return asc ? b.avgScore - a.avgScore : a.avgScore - b.avgScore;
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
              const key = keys.find((col) => columns[col].header === h);
              if (!key) return null;

              const value = plr[key];
              const roundedValue = columns[key].format
                ? columns[key].format(value as number)
                : value;

              return (
                <td key={h} className="text-center">
                  {roundedValue}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
