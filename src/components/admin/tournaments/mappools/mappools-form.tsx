"use client";

import { addMappoolMap } from "@/actions/tournament-mappools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mappoolMapFormSchema, MappoolMapFormSchema } from "./schema";

interface MappoolsFormProps {
  id: number;
  stageId: number;
}

export function MappoolsForm({ id, stageId }: MappoolsFormProps) {
  const form = useForm<MappoolMapFormSchema>({
    resolver: zodResolver(mappoolMapFormSchema),
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => addMappoolMap(data, id, stageId))}
    >
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
