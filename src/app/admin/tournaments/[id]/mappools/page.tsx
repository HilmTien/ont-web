import { DeleteMapButton } from "@/components/admin/tournaments/mappools/delete-map-button";
import { MappoolsForm } from "@/components/admin/tournaments/mappools/mappools-form";
import { TogglePublicButton } from "@/components/admin/tournaments/mappools/toggle-public-button";
import { getTournament } from "@/lib/admin/tournaments/mappools/query";
import { createServerClient } from "@/lib/server";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id, 10);

  if (Number.isNaN(id)) {
    return <>Invalid url</>;
  }

  const supabase = await createServerClient();

  const { data: tournament } = await getTournament(supabase, { id: id });

  if (!tournament) {
    return <>Error fetching tournament data</>;
  }

  if (tournament.tournament_stages.length === 0) {
    return <>Add stages to edit mappool</>;
  }

  tournament.tournament_stages.sort((a, b) => a.stage_index - b.stage_index);

  for (const stage of tournament.tournament_stages) {
    stage.mappool_maps.sort((a, b) =>
      a.map_index.localeCompare(b.map_index, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    );
  }

  return (
    <table className="mx-5">
      <tbody>
        {tournament.tournament_stages.map((stage) => (
          <tr key={stage.stage_index} className="flex flex-col">
            <td className="my-2 flex flex-row gap-5">
              <p>{stage.stage_name}</p>
              <TogglePublicButton
                tournamentId={tournament.id}
                isPublic={stage.is_public}
                stageId={stage.id}
              />
            </td>
            {stage.mappool_maps.map((map) => (
              <td key={map.id} className="my-1">
                <p>
                  {map.id} - {map.map_index} - {map.beatmaps.osu_id} -{" "}
                  {map.mods}
                </p>
                <div className="grid grid-cols-3">
                  <div className="flex flex-col">
                    <p>
                      {map.beatmaps.artist} - {map.beatmaps.name}
                    </p>
                    <p>{map.beatmaps.difficulty_name}</p>
                    <p>{map.beatmaps.mapper}</p>
                  </div>
                  <Link
                    href={`https://osu.ppy.sh/b/${map.beatmaps.osu_id}`}
                    target="_blank"
                  >
                    <Image
                      src={
                        !map.beatmaps.cover ||
                        map.beatmaps.cover?.endsWith("cover.jpg?0")
                          ? "/beatmaps/default-bg.png"
                          : map.beatmaps.cover
                      }
                      alt="Beatmap Image"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="ml-5 w-56"
                    ></Image>
                  </Link>
                  <DeleteMapButton id={map.id} />
                </div>
              </td>
            ))}
            <td>
              <MappoolsForm tourneyId={id} stageId={stage.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
