"use client";
import { createRegistration } from "@/actions/registrations";
import { isActionError } from "@/lib/error";

export function RegisterButton({ tournamentId }: { tournamentId: number }) {
  const handleClick = async () => {
    const response = await createRegistration({ tournament_id: tournamentId });
    if (isActionError(response)) {
      console.log(response.error);
    }
  };

  return <button onClick={handleClick}>Register</button>;
}
