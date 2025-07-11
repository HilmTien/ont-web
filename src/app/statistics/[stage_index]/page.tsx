import { StatisticsApp } from "@/components/statistics/statistics-app";
import { StatisticsView } from "@/components/statistics/statistics-view";
import { createServerClient } from "@/lib/server";
import { getStatistics } from "@/lib/statistics/query";
import { makeStatistics } from "@/lib/statistics/utils";

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
    <div className="m-2 flex gap-10">
      <StatisticsApp />
      <StatisticsView
        mapStats={mapStats}
        overallStats={overallStats}
        statistics={statistics}
      />
    </div>
  );
}
