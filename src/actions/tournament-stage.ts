"use server";

import {
  PublicTournamentStagesInsertSchema,
  PublicTournamentStagesRowSchema,
} from "@/generated/zod-schema-types";
import { ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";
import { revalidatePath } from "next/cache";

export async function createTournamentStage(
  data: PublicTournamentStagesInsertSchema,
): Promise<ServerActionResponse> {
  const supabase = await createServerClient();

  const { data: stages } = await supabase
    .from("tournament_stages")
    .select()
    .eq("tournament_id", data.tournament_id);

  if (
    stages &&
    stages.some((stage) => stage.stage_index === data.stage_index)
  ) {
    return { error: "Cannot have duplicate stage index" };
  }

  await supabase.from("tournament_stages").insert(data);

  revalidatePath(`/admin/tournament/${data.tournament_id}`);
}

export async function deleteTournamentStage(
  stage: PublicTournamentStagesRowSchema,
): Promise<ServerActionResponse> {
  const supabase = await createServerClient();

  await supabase.from("tournament_stages").delete().eq("id", stage.id);

  revalidatePath(`/admin/tournament/${stage.tournament_id}`);
}
