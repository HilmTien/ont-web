import Content from "@/components/general/content";
import { ScheduleStageSelector } from "@/components/schedule/schedule-stage-selector";
import ScheduleView from "@/components/schedule/schedule-view";
import { getStageMatches } from "@/lib/schedule/query";
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

  const { data: stage } = await getStageMatches(supabase, {
    tournamentId: 1,
    stageIndex: stageIndex,
  });

  if (!stage) {
    return <>Error fetching matches data</>;
  }

  return (
    <Content>
      <ScheduleStageSelector stageIndex={stageIndex} />
      <ScheduleView stage={stage} />
    </Content>
  );
}
