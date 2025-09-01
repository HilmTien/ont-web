"use client";

import { useForm } from "react-hook-form";

import { createTournament } from "@/actions/tournament";
import { PublicTournamentsInsert } from "@/generated/zod-schema-types";
import { publicTournamentsInsertSchema } from "@/generated/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export function TournamentForm() {
  const form = useForm<PublicTournamentsInsert>({
    resolver: zodResolver(publicTournamentsInsertSchema),
    defaultValues: {
      name: "My Osu! Tournament",
      acronym: "MOT",
      team_size: null,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(createTournament)}>
      <input {...form.register("name")} />
      <input {...form.register("acronym")} />
      <input
        {...form.register("team_size", {
          setValueAs: (v) => (v === "" ? null : parseInt(v)),
        })}
      />
      <input type="submit" />
    </form>
  );
}
