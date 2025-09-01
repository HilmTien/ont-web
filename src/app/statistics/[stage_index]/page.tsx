import { StatisticsStageSelector } from "@/components/statistics/statistics-stage-selector";
import { StatisticsView } from "@/components/statistics/statistics-view";
import { createServerClient } from "@/lib/server";
import { getStatistics } from "@/lib/statistics/query";
import { makeStatistics } from "@/lib/statistics/utils";
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

  const { data: statistics } = await getStatistics(supabase, {
    id: 1,
    stageIndex: stageIndex,
  });

  if (!statistics) {
    return <>Error fetching statistics data</>;
  }

  const [mapStats, overallStats] = await makeStatistics(statistics);

  return (
    <Content>
      <div className="border-accent mx-auto border-b-2">
        <StatisticsStageSelector stageIndex={stageIndex} />
      </div>
      <StatisticsView
        mapStats={mapStats}
        overallStats={overallStats}
        statistics={statistics}
      />
    </Content>
  );
}
