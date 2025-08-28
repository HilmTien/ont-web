import Dropdown from "@/components/ui/dropdown";
import ToolTip from "@/components/ui/tooltip";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu, Separator } from "radix-ui";

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
                    : "/profile-pics/avatar-guest.png"
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
          <DropdownMenu.Item className="flex h-16 items-center justify-center">
            <Link
              href={`https://osu.ppy.sh/users/${session.data.osuId}`}
              target="_blank"
              className=""
            >
              {session.data.user.name}
            </Link>
          </DropdownMenu.Item>
          <Separator.Root className="mx-3 h-[1px] bg-white" />
          <DropdownMenu.Item className="mx-4">
            <button
              onClick={() => signOut()}
              className="hover:bg-navbar my-4 w-full cursor-pointer rounded-md px-4 py-1 text-left transition-colors"
            >
              Logg ut
            </button>
          </DropdownMenu.Item>
        </Dropdown>
      ) : session.status === "unauthenticated" ? (
        <ToolTip
          trigger={
            <button
              className="cursor-pointer rounded-full select-none"
              onClick={() => signIn("osu")}
            >
              <Image
                src={"/profile-pics/avatar-guest.png"}
                alt="Profile Picture"
                width={0}
                height={0}
                sizes="100vw"
                className={`rounded-[50%] transition-all ${navBg ? "w-12" : "w-15"}`}
              ></Image>
            </button>
          }
        >
          <p>Klikk for å logge inn</p>
        </ToolTip>
      ) : (
        <Image
          src={"/profile-pics/avatar-guest.png"}
          alt="Profile Picture"
          width={0}
          height={0}
          sizes="100vw"
          className={`rounded-[50%] transition-all ${navBg ? "w-12" : "w-15"}`}
        ></Image>
      )}
    </>
  );
}
