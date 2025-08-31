import Content from "@/components/general/content";
import { MatchCard } from "@/components/schedule/match-card";
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

  const { data: matches } = await getStageMatches(supabase, {
    tournamentId: 1,
    stageIndex: stageIndex,
  });

  if (!matches || matches.length == 0) {
    return <>No matches for this stage</>;
  }

  return (
    <Content>
      {matches.map((match) => (
        <MatchCard match={match} key={match.id}></MatchCard>
      ))}
    </Content>
  );
}
