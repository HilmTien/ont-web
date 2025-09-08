import { createServerClient } from "@/lib/server";
import { getStagesSelector } from "@/lib/stages";
import Link from "next/link";
import SelectMenu from "../ui/select";

interface MappoolsStageSelectorProps {
  stageIndex: number;
}

export async function MappoolsStageSelector({
  stageIndex,
}: MappoolsStageSelectorProps) {
  const supabase = await createServerClient();

  const { data: stages } = await getStagesSelector(supabase);

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

  return (
    <>
      <div className="border-accent mx-auto hidden gap-5 border-b-2 text-lg lg:flex">
        {stageButtons}
      </div>
      <div className="lg:hidden">
        <SelectMenu stages={stages} stageIndex={stageIndex} page="mappools" />
      </div>
    </>
  );
}
