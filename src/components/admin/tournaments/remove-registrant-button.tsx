"use client";

import { removeRegistration } from "@/actions/registrations";

interface RemoveRegistrantButtonProps {
  userId: number;
  tournamentId: number;
}

export function RemoveRegistrantButton({
  userId,
  tournamentId,
}: RemoveRegistrantButtonProps) {
  return (
    <button onClick={() => removeRegistration(userId, tournamentId)}>
      Remove
    </button>
  );
}
