import { PublicStagesData } from "@/lib/referee/query";
import Image from "next/image";
import { MouseEventHandler } from "react";

interface MapSelectProps {
  map: PublicStagesData[number]["mappool_maps"][number];
  selector?: "red" | "blue" | "tiebreaker";
  selectType: "pick" | "ban" | "tiebreaker";
  winner?: "red" | "blue" | "tie";
  onWin: (winner: "red" | "blue" | "tie", mapId: number) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function MapSelect({
  map,
  onClick,
  selector,
  selectType,
  winner,
  onWin,
}: MapSelectProps) {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-md select-none ${selector !== undefined ? "cursor-default outline-3" : "hover:cursor-pointer"} ${selector === "red" ? "outline-red" : selector === "blue" ? "outline-blue" : "outline-white"}`}
    >
      <div
        className={`${selector !== undefined ? `brightness-30 ${selectType === "ban" ? "grayscale-100" : ""}` : ""}`}
      >
        <Image
          src={map.beatmaps.cover ?? "/beatmaps/default-bg.png"}
          alt={`${map.map_index} map cover`}
          width={900}
          height={250}
          unoptimized
          className={`${selector !== undefined ? "blur-xs" : ""}`}
          priority={true}
          draggable={false}
        />
        <div className="bg-table absolute top-0 left-0 flex h-full w-1/4 items-center justify-center opacity-90">
          <span className="text-accent text-4xl font-bold">
            {map.map_index}
          </span>
        </div>
      </div>
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
        <span
          className={`text-4xl font-bold ${selector === "red" ? "text-red" : selector === "blue" ? "text-blue" : "text-white"}`}
        >
          {selector === undefined ? "" : selectType.toUpperCase()}
        </span>
      </div>
      {selector !== undefined && selectType !== "ban" && (
        <div className="absolute top-0 right-0 flex h-full w-1/4 flex-col">
          <button
            onClick={() => onWin("red", map.id)}
            className={`${winner === "red" ? "bg-red" : "bg-table"} ${selector === "red" ? "outline-red" : selector === "blue" ? "outline-blue" : "outline-white"} flex h-full items-center justify-center font-semibold outline-2`}
          >
            RED WIN
          </button>
          <button
            onClick={() => onWin("tie", map.id)}
            className={`${winner === "tie" ? "bg-white text-black" : "bg-table text-white"} ${selector === "red" ? "outline-red" : selector === "blue" ? "outline-blue" : "outline-white"} flex h-full items-center justify-center font-semibold outline-2`}
          >
            TIE
          </button>
          <button
            onClick={() => onWin("blue", map.id)}
            className={`${winner === "blue" ? "bg-blue" : "bg-table"} ${selector === "red" ? "outline-red" : selector === "blue" ? "outline-blue" : "outline-white"} flex h-full items-center justify-center font-semibold outline-2`}
          >
            BLUE WIN
          </button>
        </div>
      )}
    </div>
  );
}
