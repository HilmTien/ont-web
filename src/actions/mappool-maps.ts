"use server";

import { ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";

export async function addMappoolMap(data: {
  osu_id: number;
  map_index: string;
  mods: string;
}): Promise<ServerActionResponse> {
  const supabase = await createServerClient();
  console.log(data);
}
