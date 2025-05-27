import { createServerClient } from "@/lib/server";

export async function MappoolsApp() {
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
    <a key={i} href={`/mappools/${i}`}>
      {stage.stage_name}
    </a>
  ));

  return <div className="flex flex-col">{stageButtons}</div>;
}
