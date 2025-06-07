import { ModsEntry } from "@/lib/interfaces/mappools";
import { MapEntry } from "@/lib/interfaces/statistics";
import Image from "next/image";

interface MappoolsViewProps {
  beatmaps: MapEntry;
  mapMods: ModsEntry;
}

export function MappoolsView({ beatmaps, mapMods }: MappoolsViewProps) {
  const mappoolA = [];
  const mappoolB = [];

  for (const map in beatmaps) {
    const beatmap = beatmaps[map];
    const mods = mapMods[map];

    if (!beatmap.cover || beatmap.cover.endsWith("cover.jpg?0")) {
      beatmap.cover = "/beatmaps/default-bg.png";
    }

    const mapCard = (
      <div key={map} className="w-96">
        <div className="flex justify-between">
          <h1>{map}</h1>
          <h1>{mods}</h1>
        </div>
        <a href={`https://osu.ppy.sh/b/${beatmap.osu_id}`} target="_blank">
          <Image
            src={beatmap.cover}
            alt="Beatmap Image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-96"
          ></Image>
        </a>

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

    if (map[0] === "A") {
      mappoolA.push(mapCard);
    }
    if (map[0] === "B") {
      mappoolB.push(mapCard);
    }
  }

  return (
    <div className="flex flex-row gap-20">
      <div className="flex flex-col gap-5">{mappoolA}</div>
      <div className="flex flex-col gap-5">{mappoolB}</div>
    </div>
  );
}
