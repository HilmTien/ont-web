import { MappoolData } from "@/lib/mappools/query";
import { formatSecondsToMMSS } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Clock from "../icons/clock";
import MusicNote from "../icons/music-note";
import Star from "../icons/star";

interface MappoolsViewProps {
  data: MappoolData;
}

export function MappoolsView({ data }: MappoolsViewProps) {
  const mappoolA: React.ReactElement[] = [];
  const mappoolB: React.ReactElement[] = [];
  const mappoolTB: React.ReactElement[] = [];

  const mappoolMaps = data.mappool_maps.sort((a, b) =>
    a.map_index.localeCompare(b.map_index, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );

  mappoolMaps.forEach((map) => {
    const beatmap = map.beatmaps;

    if (!beatmap.cover || beatmap.cover.endsWith("cover.jpg?0")) {
      beatmap.cover = "/beatmaps/default-bg.png";
    }

    const mapCard = (
      <div
        key={map.map_index}
        className="shadow-container bg-card flex h-67 w-72 flex-col rounded-md sm:h-84 sm:w-[520px]"
      >
        <div className="mb-2 flex place-items-baseline justify-between px-5 pt-5">
          <h1 className="text-lg sm:text-2xl">{map.map_index}</h1>
          <h1 className="text-sm sm:text-lg">{map.mods}</h1>
        </div>
        <Link href={`https://osu.ppy.sh/b/${beatmap.osu_id}`} target="_blank">
          <Image
            src={beatmap.cover}
            alt="Beatmap Image"
            width={900}
            height={250}
            unoptimized
            className="w-full"
          />
        </Link>
        <div className="px-5">
          <h1
            title={`${beatmap.name} [${beatmap.difficulty_name}]`}
            className="text-md truncate pt-2 font-semibold sm:text-xl"
          >
            {beatmap.name} [{beatmap.difficulty_name}]
          </h1>
          <h2 className="text-sm sm:text-lg">{beatmap.artist}</h2>
          <p className="text-accent sm:text-md text-xs">
            Mappet av {beatmap.mapper}
          </p>
        </div>
        <div className="mt-auto flex flex-col justify-between gap-2 px-5 pb-2 sm:flex-row">
          <div className="flex flex-row gap-2 text-sm sm:text-lg">
            <p className="flex items-center gap-1">
              <Star className="stroke-accent" /> {beatmap.star_rating}
            </p>
            <p className="flex items-center gap-1">
              <Clock className="stroke-accent" />{" "}
              {formatSecondsToMMSS(beatmap.drain_time)}
            </p>
            <p className="flex items-center gap-1">
              <MusicNote className="stroke-accent" /> {beatmap.bpm}
            </p>
          </div>
          <div className="flex flex-row gap-2 text-sm sm:text-lg">
            <p>
              <span className="text-accent font-semibold">CS</span> {beatmap.cs}
            </p>
            <p>
              <span className="text-accent font-semibold">AR</span> {beatmap.ar}
            </p>
            <p>
              <span className="text-accent font-semibold">HP</span> {beatmap.hp}
            </p>
            <p>
              <span className="text-accent font-semibold">OD</span> {beatmap.od}
            </p>
          </div>
        </div>
      </div>
    );

    if (map.map_index[0] === "A") {
      mappoolA.push(mapCard);
    }
    if (map.map_index[0] === "B") {
      mappoolB.push(mapCard);
    }
    if (map.map_index === "TB") {
      mappoolTB.push(mapCard);
    }
  });

  return (
    <>
      <div className="mt-14 flex flex-wrap justify-center gap-20">
        <div className="flex flex-col gap-5">{mappoolA}</div>
        <div className="flex flex-col gap-5">{mappoolB}</div>
      </div>
      <div className="mx-auto mt-20">{mappoolTB}</div>
    </>
  );
}
