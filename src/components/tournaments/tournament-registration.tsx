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
      className={"bg-disabled ml-10 flex-1 py-3 text-center text-xl shadow-2xl"}
    >
      Du er registrert!
    </div>
  ) : (
    <button
      className={
        "bg-accent ml-10 flex-1 py-3 text-center text-xl shadow-2xl hover:cursor-pointer"
      }
      onClick={signUp}
    >
      Registrer
    </button>
  );
}
