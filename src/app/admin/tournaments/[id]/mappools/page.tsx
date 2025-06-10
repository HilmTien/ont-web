import { MappoolsForm } from "@/components/admin/mappools/mappools-form";
import { Tables } from "@/generated/database.types";
import { createServerClient } from "@/lib/server";

interface BeatmapEntry {
  [beatmapId: number]: Tables<"beatmaps">;
}

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

  const { data: stages } = await supabase
    .from("tournament_stages")
    .select()
    .eq("tournament_id", id);

  const { data: mappoolMaps } = await supabase.from("mappool_maps").select();
  if (!mappoolMaps) {
    return <>Error fetching data</>;
  }

  const { data: beatmaps } = await supabase.from("beatmaps").select();
  if (!beatmaps) {
    return <>Error fetching data</>;
  }

  const beatmapLookup = new Map(
    beatmaps.map((b: Tables<"beatmaps">) => [b.id, b]),
  );
  const beatmapIds: BeatmapEntry = {};
  for (const map of mappoolMaps) {
    const beatmap = beatmapLookup.get(map.beatmap_id);
    if (beatmap) {
      beatmapIds[map.id] = beatmap;
    }
  }

  return (
    <table>
      <tbody>
        {stages &&
          stages.map((stage) => (
            <tr key={stage.id} className="flex flex-col">
              <td>{stage.stage_name}</td>
              {mappoolMaps.map((mappoolMap) =>
                mappoolMap.stage_id === stage.id ? (
                  <td key={mappoolMap.id}>
                    {mappoolMap.map_index}
                    {mappoolMap.beatmap_id}
                    {mappoolMap.mods}
                  </td>
                ) : null,
              )}
              <td>
                <MappoolsForm />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
