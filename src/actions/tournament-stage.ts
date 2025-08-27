"use server";

import { Tables } from "@/generated/database.types";
import {
  PublicTournamentStagesInsert,
  PublicTournamentStagesRow,
} from "@/generated/zod-schema-types";
import { ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";
import { revalidatePath } from "next/cache";

export async function createTournamentStage(
  data: PublicTournamentStagesInsert,
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
  stage: PublicTournamentStagesRow,
): Promise<ServerActionResponse> {
  const supabase = await createServerClient();

  await supabase.from("tournament_stages").delete().eq("id", stage.id);

  revalidatePath(`/admin/tournament/${stage.tournament_id}`);
}

export async function updateIsPublic(
  tournamentId: number,
  isPublic: boolean,
  stageId: number,
): Promise<ServerActionResponse<Tables<"tournament_stages">>> {
  const supabase = await createServerClient();

  const { data: updatedIsPublic } = await supabase
    .from("tournament_stages")
    .update({ is_public: isPublic })
    .eq("id", stageId)
    .select()
    .single();

  if (!updatedIsPublic) {
    return { error: "Could not update the isPublic field" };
  }

  revalidatePath(`admin/tournaments/${tournamentId}/mappools`);
  return updatedIsPublic;
}
