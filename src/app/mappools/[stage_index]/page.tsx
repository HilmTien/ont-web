import { MappoolsStageSelector } from "@/components/mappools/mappools-stage-selector";
import { MappoolsView } from "@/components/mappools/mappools-view";
import { getMappool } from "@/lib/mappools/query";
import { createServerClient } from "@/lib/server";
import Content from "@/components/general/content";

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
    tourneyId: 1,
    stageIndex: stageIndex,
  });

  if (!mappool) {
    return <>Error fetching mappool data</>;
  }

  return (
    <Content>
      <div className="border-accent mx-auto border-b-2">
        <MappoolsStageSelector stageIndex={stageIndex} />
      </div>

      {mappool.is_public ? (
        <MappoolsView data={mappool} />
      ) : (
        <p className="mx-auto p-8">Mappoolet er ikke ute enda</p>
      )}
    </Content>
  );
}
