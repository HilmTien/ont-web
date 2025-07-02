"use client";

import { addMappoolMap } from "@/actions/tournament-mappools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mappoolMapFormSchema, MappoolMapFormSchema } from "./schema";

interface MappoolsFormProps {
  stageId: number;
}

export function MappoolsForm({ stageId }: MappoolsFormProps) {
  const form = useForm<MappoolMapFormSchema>({
    resolver: zodResolver(mappoolMapFormSchema),
  });

  return (
    <form onSubmit={form.handleSubmit((data) => addMappoolMap(data, stageId))}>
      <input {...form.register("mapIndex")} />
      <input
        {...form.register("osuId", {
          setValueAs: (v) => parseInt(v),
        })}
      />
      <input {...form.register("mods")} />
      <input type="submit" />
    </form>
  );
}
