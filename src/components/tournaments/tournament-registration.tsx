"use client";
import { createRegistration } from "@/actions/registrations";

export function RegisterButton({ tournamentId }: { tournamentId: number }) {
  const handleClick = async () => {
    try {
      await createRegistration({ tournament_id: tournamentId });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return <button onClick={handleClick}>Register</button>;
}
