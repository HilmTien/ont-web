"use client";

import { createScores } from "@/actions/tournament-scores";
import { StagesScoresData } from "@/lib/admin/tournaments/statistics/query";

interface CreateScoresButtonProps {
  stage: StagesScoresData[number];
  tournamentId: number;
}

export default function CreateScoresButton({
  stage,
  tournamentId,
}: CreateScoresButtonProps) {
  return (
    <button onClick={() => createScores(stage, tournamentId)}>
      Create scores
    </button>
  );
}
