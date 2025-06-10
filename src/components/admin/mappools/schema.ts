import { z } from "zod";

export const mappoolMapFormSchema = z.object({
  osu_id: z.number(),
  map_index: z.string(),
  mods: z.string(),
});

export type MappoolMapFormSchema = z.infer<typeof mappoolMapFormSchema>;
