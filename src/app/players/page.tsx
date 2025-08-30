import { createServerClient } from "@/lib/server";
import PlayerCard from "@/components/players/player-card";

export default async function Page() {
  const supabase = await createServerClient();

  const { data: registrations } = await supabase
    .from("registrations")
    .select("registered_at, users(username, osu_id)")
    .eq("tournament_id", 1);

  if (!registrations) {
    return <div>An error occurred</div>;
  }

  return (
    <div className="bg-content shadow-container z-1 m-2 mx-auto flex min-h-90 max-w-[75%] flex-col">
      <ol className="flex flex-wrap justify-center">
        {registrations.map((registration) => (
          <PlayerCard
            key={registration.users.osu_id}
            username={registration.users.username}
            osu_id={registration.users.osu_id}
            registered_at={registration.registered_at}
          />
        ))}
      </ol>
    </div>
  );
}
