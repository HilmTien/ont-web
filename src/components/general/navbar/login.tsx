import Dropdown from "@/components/ui/dropdown";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

interface LogInProps {
  navBg: boolean;
}

export default function LogIn({ navBg }: LogInProps) {
  const session = useSession();
  return (
    <>
      {session.status === "authenticated" ? (
        <Dropdown
          trigger={
            <button className="cursor-pointer rounded-full select-none">
              <Image
                src={
                  session.data.user.image
                    ? session.data.user.image
                    : "/profile-pictures/avatar.guest.png"
                }
                alt="Profile Picture"
                width={0}
                height={0}
                sizes="100vw"
                className={`rounded-[50%] transition-all ${navBg ? "w-12" : "w-15"}`}
              ></Image>
            </button>
          }
        >
          <button onClick={() => signOut()} className="cursor-pointer">
            Log out
          </button>
        </Dropdown>
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
