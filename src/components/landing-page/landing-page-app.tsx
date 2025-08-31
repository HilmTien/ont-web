import { signIn } from "@/auth";
import Link from "next/link";
import Image from "next/image";

export default function LandingPageApp() {
  return (
    <div className="mx-auto max-w-[75%]">
      <section className="bg-content shadow-container mb-8 flex flex-row items-center justify-between p-10">
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

        <div className="border-accent aspect-video h-full w-full max-w-[50%] overflow-hidden rounded-md border-4">
          <iframe
            src="https://www.youtube.com/embed/MSeZTBKf5cI?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0"
            title="YouTube video player"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          ></iframe>
        </div>
      </section>

      <section className="flex items-end gap-10">
        <div className="min-w-[470px]">
          <p className="border-accent mb-4 border-b-2 pb-2 text-2xl font-semibold tracking-[0.3em]">
            TIDSLINJE
          </p>
          <ul className="space-y-2 text-xl">
            <li className="flex justify-between">
              <span className="font-medium">REGS</span>
              <span>1. September - 1. September</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Kvalifisering</span>
              <span>1. September - 1. September</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">UKE 1</span>
              <span>1. September - 1. September</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-1 gap-4">
          <Link
            href="/mappools"
            className="bg-accent ml-20 flex-1 py-3 text-center text-xl shadow-2xl"
          >
            Mappool
          </Link>
          <Link
            href="/"
            className="bg-accent ml-10 flex-1 py-3 text-center text-xl shadow-2xl"
          >
            Register
          </Link>
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
