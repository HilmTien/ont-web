"use client";

import { deleteTournamentStage } from "@/actions/tournament-stage";
import { PublicTournamentStagesRow } from "@/generated/zod-schema-types";

interface DeleteStageButtonProps {
  stage: PublicTournamentStagesRow;
}

export function DeleteStageButton({ stage }: DeleteStageButtonProps) {
  return <button onClick={() => deleteTournamentStage(stage)}>Delete</button>;
}
