import { auth, signIn } from "@/auth";
import { createServerClient } from "@/lib/server";
import Image from "next/image";
import Link from "next/link";
import { RegisterButton } from "../tournaments/tournament-registration";
import Discord from "../icons/discord";
import Youtube from "../icons/youtube";
import Twitch from "../icons/twitch";

export default async function LandingPageApp() {
  const session = await auth();

  const supabase = await createServerClient();

  let registered: boolean;

  if (session) {
    const { data: user } = await supabase
      .from("users")
      .select("registrations(id)")
      .eq("osu_id", session?.osuId)
      .single();

    if (!user) {
      registered = false;
    } else {
      registered = user.registrations.length != 0;
    }
  } else {
    registered = false;
  }

  return (
    <div className="mx-auto max-w-[75%]">
      <section className="bg-content shadow-container mb-4 flex flex-row items-center justify-between p-10">
        <div className="">
          <div className="ml-10 flex w-full flex-col items-start justify-center">
            <Image
              src={"/logos/ont/new-logo.png"}
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              className={"w-40"}
            ></Image>
            <p className="text-5xl font-bold">
              osu! Norge Turnering <span className="">5</span>
            </p>
            <p className="mt-2 text-2xl">
              Vi fokuserer <span className="underline">fortsatt</span> på høy
              produksjon.
            </p>
          </div>
        </div>

        <div className="border-accent aspect-video h-full w-[30vw] max-w-[50%] overflow-hidden rounded-md border-4">
          <iframe
            src="https://www.youtube.com/embed/MSeZTBKf5cI?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0"
            title="YouTube video player"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          ></iframe>
        </div>
      </section>

      <section className="flex items-center gap-10">
        <div className="min-w-[30vw]">
          <p className="border-accent mb-2 border-b-2 pb-2 text-2xl font-semibold">
            TIDSLINJE
          </p>
          <ul className="space-y-1 text-lg">
            <li className="flex justify-between">
              <span className="font-medium">Registeringer</span>
              <span>1. September - 14. September</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Registeringer</span>
              <span>1. September - 14. September</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Gruppespill</span>
              <span>15. September - 21. September</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Runoff runde 1</span>
              <span>22. September - 28. September</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Runoff runde 2</span>
              <span>29. Oktober - 5. Oktober</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Swiss Uke 1 (0-0, 1-0, 0-1)</span>
              <span>6. Oktober - 12. Oktober</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">UKE 1</span>
              <span>13. Oktober - 19. Oktober</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">UKE 1</span>
              <span>20. Oktober - 26. Oktober</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">UKE 1</span>
              <span>20. Oktober - 26. Oktober</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">UKE 1</span>
              <span>20. Oktober - 26. Oktober</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-1 flex-col gap-15">
          <div className="g flex items-center justify-between space-x-4 px-50">
            <Link
              href="https://discord.com/invite/zY5dwFEbSx/"
              target="_blank"
              className=""
            >
              <Discord></Discord>
            </Link>
            <Link
              href="https://twitch.tv/osunorge"
              target="_blank"
              className=""
            >
              <Twitch></Twitch>
            </Link>

            <Link
              href="https://youtube.com/@osunorge"
              target="_blank"
              className=""
            >
              <Youtube></Youtube>
            </Link>
          </div>
          <div className="flex gap-4">
            <Link
              href="/mappools"
              className="bg-accent flex-1 py-3 text-center text-xl shadow-2xl"
            >
              Mappool
            </Link>
            {session ? (
              <RegisterButton tournamentId={1} registered={registered} />
            ) : (
              <div className="bg-disabled flex-1 py-3 text-center text-xl shadow-2xl">
                Logg inn for å melde på
              </div>
            )}
          </div>
        </div>
      </section>

      {process.env.NODE_ENV == "development" && (
        <form
          action={async (data) => {
            "use server";
            await signIn("credentials", { name: data.get("user") });
          }}
          className="fixed right-24 bottom-4 hover:cursor-pointer"
        >
          <select name="user">
            <option value="MockHost">Host</option>
            <option value="MockReferee">Referee</option>
            <option value="MockCommentator">Commentator</option>
            <option value="MockStreamer">Streamer</option>
            <option value="MockPlayer1">Player 1</option>
            <option value="MockPlayer2">Player 2</option>
          </select>
          <button type="submit">(DEV) Mock Login</button>
        </form>
      )}
    </div>
  );
}
