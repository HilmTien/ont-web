"use client";

import { deleteTournamentStage } from "@/actions/tournament-stage";
import { PublicTournamentStagesRowSchema } from "@/generated/zod-schema-types";

interface DeleteStageButtonProps {
  stage: PublicTournamentStagesRowSchema;
}

export function DeleteStageButton({ stage }: DeleteStageButtonProps) {
  return <button onClick={() => deleteTournamentStage(stage)}>Delete</button>;
}
