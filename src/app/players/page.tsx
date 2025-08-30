import Content from "@/components/general/content";
import PlayerCard from "@/components/players/player-card";
import { createServerClient } from "@/lib/server";

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
    <Content>
      <h2 className="font-semibold">Antall spillere: {registrations.length}</h2>
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
    </Content>
  );
}
