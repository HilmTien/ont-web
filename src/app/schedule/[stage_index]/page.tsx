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

  console.log(matches);

  return (
    <div className="bg-content shadow-container z-1 m-2 mx-auto flex max-w-[75%] flex-col">
      {matches.map((match) => (
        <MatchCard match={match} key={match.id}></MatchCard>
      ))}
    </div>
  );
}
