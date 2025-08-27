import { signIn, signOut, useSession } from "next-auth/react";

export default function LogIn() {
  const session = useSession();
  return (
    <>
      {session.status === "authenticated" ? (
        <button
          onClick={() => {
            signOut();
          }}
          className="cursor-pointer"
        >
          Log out
        </button>
      ) : session.status === "unauthenticated" ? (
        <button onClick={() => signIn("osu")} className="cursor-pointer">
          Log in
        </button>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
