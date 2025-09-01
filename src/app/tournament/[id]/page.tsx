import { auth } from "@/auth";
import { RegisterButton } from "@/components/tournaments/tournament-registration";
import { createServerClient } from "@/lib/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id, 10);

  if (Number.isNaN(id)) {
    return <>Invalid url</>;
  }

  const supabase = await createServerClient();

  const { data: tournament } = await supabase
    .from("tournaments")
    .select()
    .eq("id", id)
    .single();

  const session = await auth();

  let registered = false;

  if (session) {
    const { data: registration } = await supabase
      .from("users")
      .select("*, registrations(*)")
      .eq("osu_id", session!.osuId)
      .eq("registrations.tournament_id", id)
      .single();

    if (registration?.registrations.length) {
      registered = true;
    }
  }

  if (!tournament) {
    return <div>Tournament doesnt exist</div>;
  }

  return (
    <div>
      <p>Tournament Name: {tournament.name}</p>
      <p>Tournament ID: {tournament.id}</p>
      <p>Acronym: {tournament.acronym}</p>
      <p>Team Size: {tournament.team_size}</p>
      {session ? (
        <RegisterButton tournamentId={id} registered={registered} />
      ) : null}
    </div>
  );
}
