import { auth } from "@/auth";
import Content from "@/components/general/content";
import { RefereeHelper } from "@/components/referee/v1/referee-helper";
import { getPublicStages } from "@/lib/referee/query";
import { createServerClient } from "@/lib/server";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <div>Access Denied</div>;
  }

  const supabase = await createServerClient();

  const { data: user } = await supabase
    .from("users")
    .select(`referees(tournament_id)`)
    .eq("osu_id", session.osuId)
    .single();

  if (!user || user.referees.every((referee) => referee.tournament_id !== 1)) {
    return <div>Access Denied</div>;
  }

  const { data: stages } = await getPublicStages(supabase, {
    tournamentId: 1,
  });

  return (
    <Content>
      <p>Referee dashboard</p>

      {stages && stages.length > 0 ? (
        <RefereeHelper stages={stages} />
      ) : (
        "Could not load mappools"
      )}
    </Content>
  );
}
