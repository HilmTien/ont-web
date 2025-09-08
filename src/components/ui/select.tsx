"use client";

import { StagesData } from "@/lib/stages";
import { redirect } from "next/navigation";
import { Select } from "radix-ui";

interface SelectMenuProps {
  stages: StagesData;
  stageIndex: number;
  page: string;
}

export default function SelectMenu({
  stages,
  stageIndex,
  page,
}: SelectMenuProps) {
  return (
    <Select.Root
      defaultValue={stages[stageIndex - 1].stage_name}
      onValueChange={(stage) => {
        const index = stages.findIndex((s) => s.stage_name === stage);
        redirect(`/${page}/${index + 1}`);
      }}
    >
      <Select.Trigger className="bg-navbar cursor-pointer rounded-md p-2">
        <Select.Value />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="bg-navbar min-w-48 rounded-md"
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport className="p-[5px]">
            {stages.map((stage, i) => (
              <Select.Item
                key={i}
                value={stage.stage_name}
                className={`cursor-pointer ${stageIndex === i + 1 ? "font-semibold" : ""}`}
              >
                <Select.ItemText>{stage.stage_name}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
