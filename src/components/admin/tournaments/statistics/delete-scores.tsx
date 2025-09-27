"use client";

import { deleteScores } from "@/actions/tournament-scores";

interface DeleteScoresButtonProps {
  stageId: number;
}

export default function DeleteScoresButton({
  stageId,
}: DeleteScoresButtonProps) {
  return (
    <button onClick={() => deleteScores(stageId)}>Delete ALL scores</button>
  );
}
