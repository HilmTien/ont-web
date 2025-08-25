import { MappoolData } from "@/lib/mappools/query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MappoolsViewProps {
  data: MappoolData;
}

export function MappoolsView({ data }: MappoolsViewProps) {
  const mappoolA: React.ReactElement[] = [];
  const mappoolB: React.ReactElement[] = [];

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
      <div key={map.map_index} className="w-96">
        <div className="flex justify-between">
          <h1>{map.map_index}</h1>
          <h1>{map.mods}</h1>
        </div>
        <Link href={`https://osu.ppy.sh/b/${beatmap.osu_id}`} target="_blank">
          <Image
            src={beatmap.cover}
            alt="Beatmap Image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-96"
          ></Image>
        </Link>
        <h2>
          {beatmap.artist} - {beatmap.name} [{beatmap.difficulty_name}]
        </h2>
        <p>{beatmap.mapper}</p>
        <div className="flex flex-row gap-5">
          <div className="flex flex-row gap-2">
            <p>SR {beatmap.star_rating}</p>
            <p>LEN {beatmap.drain_time}</p>
            <p>BPM {beatmap.bpm}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p>CS {beatmap.cs}</p>
            <p>AR {beatmap.ar}</p>
            <p>HP {beatmap.hp}</p>
            <p>OD {beatmap.od}</p>
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
  });

  return (
    <div className="flex flex-row gap-20">
      <div className="flex flex-col gap-5">{mappoolA}</div>
      <div className="flex flex-col gap-5">{mappoolB}</div>
    </div>
  );
}
