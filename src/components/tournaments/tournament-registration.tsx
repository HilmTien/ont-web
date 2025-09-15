"use client";
import { createRegistration } from "@/actions/registrations";
import { isActionError } from "@/lib/error";

interface RegisterButtonProps {
  tournamentId: number;
  registered: boolean;
}

export function RegisterButton({
  tournamentId,
  registered,
}: RegisterButtonProps) {
  const signUp = async () => {
    const response = await createRegistration({ tournament_id: tournamentId });
    if (isActionError(response)) {
      console.log(response.error);
    }
    window.open("https://discord.com/invite/zY5dwFEbSx/", "_blank");
  };

  return registered ? (
    <div
      className={
        "bg-disabled ml-10 flex h-12 w-80 items-center justify-center text-center text-sm shadow-2xl sm:text-xl"
      }
    >
      Du er registrert!
    </div>
  ) : (
    <button
      className={
        "bg-accent ml-10 flex h-12 w-80 items-center justify-center text-sm shadow-2xl hover:cursor-pointer sm:text-xl"
      }
      onClick={signUp}
    >
      Registrer
    </button>
  );
}
