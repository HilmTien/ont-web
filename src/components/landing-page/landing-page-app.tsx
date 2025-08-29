import { signIn } from "@/auth";
import Link from "next/link";

export default function LandingPageApp() {
  return (
    <div className="mx-auto max-w-[80vw] px-4">
      <section className="bg-content mb-8 flex flex-row items-center justify-between p-10 shadow-2xl">
        <div>
          <h1 className="text-4xl font-bold">osu! Norge Turnering 5</h1>
          <h2 className="mt-2 text-xl">TonyWorep</h2>
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
        <div className="min-w-[480px]">
          <h3 className="mb-4 border-b-2 border-gray-300 pb-2 text-xl font-semibold">
            TIDSLINJE
          </h3>
          <ul className="space-y-2">
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
            className="flex-1 bg-gray-700 py-2 text-center text-xl text-white"
          >
            Mappool
          </Link>
          <Link
            href="/"
            className="flex-1 bg-gray-700 py-2 text-center text-xl text-white"
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
