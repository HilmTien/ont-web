"use client";
import { createRegistration } from "@/actions/registrations";
import { isActionError } from "@/lib/error";

interface RegisterButtonProps {
  tournamentId: number
  registered: boolean
}

export function RegisterButton({ tournamentId, registered }: RegisterButtonProps) {
  const signUp = async () => {
    const response = await createRegistration({ tournament_id: tournamentId });
    if (isActionError(response)) {
      console.log(response.error);
    }
  };

  return registered ? <div>Already signed up</div> : <button onClick={signUp}>Register</button>;
}
