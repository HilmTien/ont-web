"use client";

import { addMappoolMap } from "@/actions/tournament-mappools";
import { isActionError } from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mappoolMapFormSchema, MappoolMapFormSchema } from "./schema";

interface MappoolsFormProps {
  tourneyId: number;
  stageId: number;
}

export function MappoolsForm({ tourneyId, stageId }: MappoolsFormProps) {
  const form = useForm<MappoolMapFormSchema>({
    resolver: zodResolver(mappoolMapFormSchema),
  });

  return (
    <form
      onSubmit={form.handleSubmit(async (data) => {
        const res = await addMappoolMap(data, tourneyId, stageId);
        if (isActionError(res)) {
          console.error(res);
        }
      })}
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
