import Content from "@/components/general/content";
import PlayerCard from "@/components/players/player-card";
import { createServerClient } from "@/lib/server";

export default async function Page() {
  const supabase = await createServerClient();

  const { data: registrations } = await supabase
    .from("registrations")
    .select(
      "registered_at, users(username, osu_id, rank, accuracy, pp, play_count, maximum_combo, tournament_badges)",
    )
    .eq("tournament_id", 1);

  if (!registrations) {
    return <div>An error occurred</div>;
  }

  return (
    <Content>
      <h2 className="font-semibold">Antall spillere: {registrations.length}</h2>
      <ol className="flex flex-wrap justify-center">
        {registrations.map((registration) => {
          const bws =
            (registration.users.rank ?? 0) **
            (0.5 * 0.9 ** (registration.users.tournament_badges ?? 0) + 0.5);

          return (
            <PlayerCard
              key={registration.users.osu_id}
              username={registration.users.username}
              registeredAt={registration.registered_at}
              osuId={registration.users.osu_id}
              rank={registration.users.rank ?? 0}
              bws={bws}
              accuracy={registration.users.accuracy ?? 0}
              pp={registration.users.pp ?? 0}
              playCount={registration.users.play_count ?? 0}
              maximumCombo={registration.users.maximum_combo ?? 0}
            />
          );
        })}
      </ol>
    </Content>
  );
}
