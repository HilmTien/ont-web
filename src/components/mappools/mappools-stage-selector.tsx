import { createServerClient } from "@/lib/server";
import Link from "next/link";

export async function MappoolsStageSelector() {
  const supabase = await createServerClient();

  const { data: stages } = await supabase
    .from("tournament_stages")
    .select("stage_name")
    .eq("tournament_id", 1)
    .order("stage_index");

  if (!stages) {
    return <>Error no stages</>;
  }

  const stageButtons = stages.map((stage, i) => (
    <Link key={i} href={`/mappools/${i + 1}`}>
      {stage.stage_name}
    </Link>
  ));

  return <div className="flex flex-col">{stageButtons}</div>;
}
