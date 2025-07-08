"use client";

import { addMappoolMap } from "@/actions/tournament-mappools";
import { TournamentQueryData } from "@/lib/admin/tournaments/mappools/query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mappoolMapFormSchema, MappoolMapFormSchema } from "./schema";

interface MappoolsFormProps {
  tournament: TournamentQueryData;
}

export function MappoolsForm({ tournament }: MappoolsFormProps) {
  const form = useForm<MappoolMapFormSchema>({
    resolver: zodResolver(mappoolMapFormSchema),
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => addMappoolMap(data, tournament))}
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
