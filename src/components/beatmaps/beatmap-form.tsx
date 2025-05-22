"use client";

import { addBeatmap } from "@/actions/beatmaps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./schema";

export function BeatmapApp() {
  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(addBeatmap)}>
      <input
        {...form.register("id", {
          setValueAs: (v) => (v === "" ? null : parseInt(v)),
        })}
      />
      <input type="submit" />
    </form>
  );
}
