import { MappoolsApp } from "@/components/mappools/mappools-app";
import { MappoolsView } from "@/components/mappools/mappools-view";
import { getMappool } from "@/lib/mappools/query";
import { createServerClient } from "@/lib/server";

export default async function Page({
  params,
}: {
  params: Promise<{ stage_index: string }>;
}) {
  const { stage_index: stageIndexStr } = await params;
  const stageIndex = parseInt(stageIndexStr, 10);
  if (Number.isNaN(stageIndex)) {
    return <>Invalid url</>;
  }

  const supabase = await createServerClient();

  const { data: mappool } = await getMappool(supabase, {
    id: 1,
    stageIndex: stageIndex,
  });

  if (!mappool) {
    return <>Error fetching mappool data</>;
  }

  if (mappool.tournament_stages[0].is_public) {
    return (
      <div className="m-2 flex gap-36">
        <MappoolsApp />
        <MappoolsView data={mappool} />
      </div>
    );
  } else {
    return (
      <div className="m-2 flex gap-36">
        <MappoolsApp />
        <>Mappool not released yet</>
      </div>
    );
  }
}
