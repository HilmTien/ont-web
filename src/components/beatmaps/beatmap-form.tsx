"use client";

import { addBeatmap } from "@/actions/beatmaps";
import { Mods } from "@/lib/beatmaps/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./schema";

export function BeatmapForm() {
  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={form.handleSubmit((data) => addBeatmap(data.id, Mods.NM))}>
      <input
        {...form.register("id", {
          setValueAs: (v) => (v === "" ? null : parseInt(v)),
        })}
      />
      <input type="submit" />
    </form>
  );
}
