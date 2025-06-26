import { createServerClient } from "@/lib/server";
import { RegisterButton } from "@/components/tournaments/tournament-registration";

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

  if (!tournament) {
    return <div>Tournament doesnt exist</div>;
  }

  return (
    <div>
      <p>Tournament Name: {tournament.name}</p>
      <p>Tournament ID: {tournament.id}</p>
      <p>Acronym: {tournament.acronym}</p>
      <p>Team Size: {tournament.team_size}</p>

      <RegisterButton tournamentId={id} />
    </div>
  );
}
