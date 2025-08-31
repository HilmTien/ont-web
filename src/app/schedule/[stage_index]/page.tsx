import Content from "@/components/general/content";
import { MatchCard } from "@/components/schedule/match-card";
import { ScheduleStageSelector } from "@/components/schedule/schedule-stage-selector";
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
      <div className="border-accent mx-auto border-b-2">
        <ScheduleStageSelector stageIndex={stageIndex} />
      </div>
      {stage.is_public || stage.matches.length === 0
        ? stage.matches.map((match) => (
            <MatchCard match={match} key={match.id}></MatchCard>
          ))
        : ""}
    </Content>
  );
}
