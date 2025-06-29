"use server";

import { ServerActionResponse } from "@/lib/error";

export async function addMappoolMap(data: {
  osu_id: number;
  map_index: string;
  mods: string;
}): Promise<ServerActionResponse> {
  console.log(data);
}
