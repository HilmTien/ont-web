import { auth, signIn, signOut } from "@/auth";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center gap-2 px-10 pt-10 xl:pt-32">
      <h1 className="text-center text-2xl font-semibold md:text-8xl">
        UNDER UTVIKLING
      </h1>
      <p className="text-center text-gray-500 italic">Kom tilbake senere!</p>
      <Image
        src={"/logos/ont/logo.png"}
        width={1000}
        height={1000}
        alt="o!NT Logo"
        className="my-10 size-48 md:my-20 md:size-96"
        priority={true}
      />
      <a target="_blank" href="https://discord.gg/syb7Mt6dnu">
        <SiDiscord className="size-10 md:size-20" />
      </a>
      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="fixed right-4 bottom-4 hover:cursor-pointer"
          >
            Logg ut
          </button>
        </form>
      ) : (
        <>
          <form
            action={async () => {
              "use server";
              await signIn("osu");
            }}
          >
            <button
              type="submit"
              className="fixed right-4 bottom-4 hover:cursor-pointer"
            >
              Logg inn
            </button>
          </form>
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
        </>
      )}
    </div>
  );
}
