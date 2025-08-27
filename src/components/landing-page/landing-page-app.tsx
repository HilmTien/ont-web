import { signIn } from "@/auth";

export default function LandingPageApp() {
  return (
    <div>
      <p className="text-background text-9xl">aaaaaaaaaaaaaaaaaaaa</p>
      <p className="text-background text-9xl">aaaaaaaaaaaaaaaaaaaa</p>
      <p className="text-background text-9xl">aaaaaaaaaaaaaaaaaaaa</p>
      <p className="text-background text-9xl">aaaaaaaaaaaaaaaaaaaa</p>
      <p className="text-background text-9xl">aaaaaaaaaaaaaaaaaaaa</p>
      <p className="text-background text-9xl">aaaaaaaaaaaaaaaaaaaa</p>
      <p className="text-background text-9xl">aaaaaaaaaaaaaaaaaaaa</p>
      <p className="text-background text-9xl">aaaaaaaaaaaaaaaaaaaa</p>
      <p className="text-background text-9xl">aaaaaaaaaaaaaaaaaaaa</p>
      <p className="text-background text-9xl">aaaaaaaaaaaaaaaaaaaa</p>
      <p className="text-background text-9xl">aaaaaaaaaaaaaaaaaaaa</p>
      <p className="text-background text-9xl">aaaaaaaaaaaaaaaaaaaa</p>

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
