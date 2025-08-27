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
): ServerActionResponse<Tables<"tournament_stages">> {
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

  const { data: insertedStage } = await supabase
    .from("tournament_stages")
    .insert(data)
    .select()
    .single();

  if (!insertedStage) {
    return { error: "Could not insert stage" };
  }

  revalidatePath(`/admin/tournament/${data.tournament_id}`);

  return insertedStage;
}

export async function deleteTournamentStage(
  stage: PublicTournamentStagesRow,
): ServerActionResponse<Tables<"tournament_stages">> {
  const supabase = await createServerClient();

  const { data: deletedStage } = await supabase
    .from("tournament_stages")
    .delete()
    .eq("id", stage.id)
    .select()
    .single();

  if (!deletedStage) {
    return { error: "Could not delete stage" };
  }

  revalidatePath(`/admin/tournament/${stage.tournament_id}`);

  return deletedStage;
}

export async function updateIsPublic(
  tournamentId: number,
  isPublic: boolean,
  stageId: number,
): ServerActionResponse<Tables<"tournament_stages">> {
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
