import { createServerClient } from "@/lib/server";
import Link from "next/link";

interface MappoolsStageSelectorProps {
  stageIndex: number;
}

export async function MappoolsStageSelector({
  stageIndex,
}: MappoolsStageSelectorProps) {
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
    <Link
      key={i}
      href={`/mappools/${i + 1}`}
      className={`${stageIndex === i + 1 ? "text-accent font-semibold" : ""}`}
    >
      {stage.stage_name}
    </Link>
  ));

  return <div className="mx-auto flex gap-5 text-lg">{stageButtons}</div>;
}
