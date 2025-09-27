import CreateScoresButton from "@/components/admin/tournaments/statistics/create-scores";
import DeleteScoresButton from "@/components/admin/tournaments/statistics/delete-scores";
import getStagesScores from "@/lib/admin/tournaments/statistics/query";
import { createServerClient } from "@/lib/server";

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
  const { data: stages } = await getStagesScores(supabase, {
    tournamentId: id,
  });

  if (!stages) {
    return <>Error fetching stages</>;
  }

  stages.sort((a, b) => a.stage_index - b.stage_index);

  return (
    <div>
      {stages.map((stage) => (
        <div key={stage.id}>
          <h1>
            {stage.id} - {stage.stage_name}
          </h1>
          <CreateScoresButton stage={stage} tournamentId={id} />
          <DeleteScoresButton stageId={stage.id} />
        </div>
      ))}
    </div>
  );
}
