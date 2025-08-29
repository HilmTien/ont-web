import { signIn } from "@/auth";
import Link from "next/link";
import Image from "next/image";

export default function LandingPageApp() {
  return (
    <div className="mx-auto max-w-[75vw] px-4">
      <section className="bg-content shadow-container mb-8 flex flex-row items-center justify-between p-10">
        <div className="p-10">
          <div className="flex flex-row items-center justify-center">
            <Image
              src={"/logos/ont/new-logo.png"}
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              className={"w-35"}
            ></Image>
            <p className="text-4xl font-bold">
              osu! Norge Turnering <span className="">5</span>
            </p>
          </div>
          <p className="mt-2 text-xl">
            Vi fokuserer <span className="underline">fortsatt</span> på høy
            produksjon.
          </p>
        </div>

        <div className="aspect-video w-full max-w-[40rem] overflow-hidden rounded-2xl border-4 border-gray-400">
          <iframe
            src="https://www.youtube.com/embed/rJ4r8YWzS40?si=XJm5D2FrW27J647c"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          ></iframe>
        </div>
      </section>

      <section className="flex items-end gap-10">
        <div className="min-w-[430px]">
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
