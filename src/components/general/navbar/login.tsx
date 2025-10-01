import Dropdown from "@/components/ui/dropdown";
import ToolTip from "@/components/ui/tooltip";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu, Separator } from "radix-ui";

interface LogInProps {
  navBg: boolean;
  isMobile: boolean;
}

export default function LogIn({ navBg, isMobile }: LogInProps) {
  const session = useSession();
  return (
    <>
      {session.status === "authenticated" ? (
        isMobile ? (
          <Dropdown
            trigger={
              <div className="flex w-32 cursor-pointer items-center gap-2">
                <Image
                  src={
                    session.data.user.image
                      ? session.data.user.image
                      : "/profile-pics/avatar-guest.png"
                  }
                  alt="Profile Picture"
                  width={256}
                  height={256}
                  unoptimized
                  className={`rounded-[50%] transition-all ${navBg ? "w-12" : "w-15"}`}
                ></Image>
                <p className="hover:text-accent font-semibold">
                  {session.data.user.name}
                </p>
              </div>
            }
          >
            <div className="flex flex-col gap-1 p-2">
              <DropdownMenu.Item>
                <Link
                  href={`https://osu.ppy.sh/users/${session.data.osuId}`}
                  target="_blank"
                  className="hover:text-accent"
                >
                  osu! Profil
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <button onClick={() => signOut()} className="hover:text-accent">
                  Logg ut
                </button>
              </DropdownMenu.Item>
            </div>
          </Dropdown>
        ) : (
          <Dropdown
            trigger={
              <button className="flex cursor-pointer rounded-full select-none">
                <Image
                  src={
                    session.data.user.image
                      ? session.data.user.image
                      : "/profile-pics/avatar-guest.png"
                  }
                  alt="Profile Picture"
                  width={256}
                  height={256}
                  unoptimized
                  className={`rounded-[50%] transition-all ${navBg ? "w-12" : "w-15"}`}
                ></Image>
              </button>
            }
          >
            <DropdownMenu.Item className="flex h-16 items-center justify-center">
              <Link
                href={`https://osu.ppy.sh/users/${session.data.osuId}`}
                target="_blank"
                className="font-semibold"
              >
                {session.data.user.name}
              </Link>
            </DropdownMenu.Item>
            <Separator.Root className="mx-3 h-[1px] bg-white" />
            <DropdownMenu.Item>
              <div className="mx-4">
                <button
                  onClick={() => signOut()}
                  className="hover:bg-navbar my-4 w-full cursor-pointer rounded-md px-4 py-1 text-left transition-colors"
                >
                  Logg ut
                </button>
              </div>
            </DropdownMenu.Item>
          </Dropdown>
        )
      ) : session.status === "unauthenticated" ? (
        isMobile ? (
          <button
            onClick={() => signIn("osu")}
            className="flex w-32 cursor-pointer items-center gap-2"
          >
            <Image
              src={"/profile-pics/avatar-guest.png"}
              alt="Profile Picture"
              width={256}
              height={256}
              unoptimized
              className={`rounded-[50%] transition-all ${navBg ? "w-12" : "w-15"}`}
            ></Image>
            <p className="hover:text-accent font-semibold">Logg inn</p>
          </button>
        ) : (
          <ToolTip
            trigger={
              <button
                className="flex cursor-pointer rounded-full select-none"
                onClick={() => signIn("osu")}
              >
                <Image
                  src={"/profile-pics/avatar-guest.png"}
                  alt="Profile Picture"
                  width={256}
                  height={256}
                  unoptimized
                  className={`rounded-[50%] transition-all ${navBg ? "w-12" : "w-15"}`}
                ></Image>
              </button>
            }
          >
            <p className="p-2">Klikk for å logge inn</p>
          </ToolTip>
        )
      ) : (
        <Image
          src={"/profile-pics/avatar-guest.png"}
          alt="Profile Picture"
          width={256}
          height={256}
          unoptimized
          className={`flex rounded-[50%] transition-all ${navBg ? "w-12" : "w-15"}`}
        ></Image>
      )}
    </>
  );
}
