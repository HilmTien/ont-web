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
      <ScheduleStageSelector stageIndex={stageIndex} />
      {stage.is_public ? (
        stage.matches.length !== 0 ? (
          stage.matches
            .sort(
              (a, b) =>
                new Date(a.match_time).getTime() -
                new Date(b.match_time).getTime(),
            )
            .map((match) => <MatchCard match={match} key={match.id} />)
        ) : (
          <p className="mx-auto pb-8">Denne runden har ingen matches</p>
        )
      ) : (
        <p className="mx-auto pt-4">Denne runden er ikke offentlig enda</p>
      )}
    </Content>
  );
}
