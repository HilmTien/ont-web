"use client";

import { updateIsPublic } from "@/actions/tournament-stage";

interface TogglePublicButtonProps {
  tournamentId: number;
  isPublic: boolean;
  stageId: number;
}

export function TogglePublicButton({
  tournamentId,
  isPublic,
  stageId,
}: TogglePublicButtonProps) {
  return (
    <button
      className="cursor-pointer"
      onClick={() => updateIsPublic(tournamentId, !isPublic, stageId)}
    >
      {isPublic ? "PUBLIC" : "NOT PUBLIC"}
    </button>
  );
}
