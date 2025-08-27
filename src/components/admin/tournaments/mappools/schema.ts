import { z } from "zod";

export const mappoolMapFormSchema = z.object({
  osuId: z.number(),
  mapIndex: z.string(),
  mods: z.string(),
});

export type MappoolMapFormSchema = z.infer<typeof mappoolMapFormSchema>;
