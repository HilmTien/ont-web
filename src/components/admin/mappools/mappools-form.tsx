"use client";

import { addMappoolMap } from "@/actions/mappool-maps";
import { isActionError } from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mappoolMapFormSchema, MappoolMapFormSchema } from "./schema";

export function MappoolsForm() {
  const form = useForm<MappoolMapFormSchema>({
    resolver: zodResolver(mappoolMapFormSchema),
  });

  const onSubmit = async (data: MappoolMapFormSchema) => {
    const result = await addMappoolMap(data);

    if (isActionError(result)) {
      console.log(result.error);
    } else {
      console.log("success");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("map_index")} />
      <input
        {...form.register("osu_id", {
          setValueAs: (v) => parseInt(v),
        })}
      />
      <input {...form.register("mods")} />
      <input type="submit" />
    </form>
  );
}
