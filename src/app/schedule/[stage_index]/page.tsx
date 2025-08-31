import Content from "@/components/general/content";
import { MatchCard } from "@/components/schedule/match-card";
import { getStageMatches } from "@/lib/schedule/query";
import { createServerClient } from "@/lib/server";
import { ScheduleStageSelector } from "@/components/schedule/schedule-stage-selector";

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

  if (!stage || stage.matches.length == 0) {
    return <>No matches for this stage</>;
  }

  return (
    <Content>
      <div className="border-accent mx-auto border-b-2">
        <ScheduleStageSelector stageIndex={stageIndex} />
      </div>
      {stage.matches.map((match) => (
        <MatchCard match={match} key={match.id}></MatchCard>
      ))}
    </Content>
  );
}
