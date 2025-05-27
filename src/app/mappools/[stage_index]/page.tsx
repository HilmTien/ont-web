import { MappoolsApp } from "@/components/mappools/mappools-app";
import { MappoolsView } from "@/components/mappools/mappools-view";
import { Tables } from "@/generated/database.types";
import { MapEntry } from "@/lib/interfaces/statistics";
import { createServerClient } from "@/lib/server";

export default async function Page({
  params,
}: {
  params: Promise<{ stage_index: string }>;
}) {
  const { stage_index: stageIndexStr } = await params;
  const stage_index = parseInt(stageIndexStr, 10);
  if (Number.isNaN(stage_index)) {
    return <>Invalid url</>;
  }

  const supabase = await createServerClient();

  const { data: stageId } = await supabase
    .from("tournament_stages")
    .select("id, is_public")
    .eq("stage_index", stage_index)
    .single();

  if (!stageId) {
    return <>Error fetching data</>;
  }

  if (stageId.is_public) {
    const { data: mappoolMaps } = await supabase
      .from("mappool_maps")
      .select("id, beatmap_id, map_index")
      .eq("stage_id", stageId.id);

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
    const mapIndexes: MapEntry = {};
    for (const map of mappoolMaps) {
      const beatmap = beatmapLookup.get(map.beatmap_id);
      if (beatmap) {
        mapIndexes[map.map_index] = beatmap;
      }
    }

    return (
      <div className="m-2 flex gap-36">
        <MappoolsApp />
        <MappoolsView beatmaps={mapIndexes} />
      </div>
    );
  } else {
    return (
      <div className="m-2 flex gap-36">
        <MappoolsApp />
        <p>Mappool not released</p>
      </div>
    );
  }
}
