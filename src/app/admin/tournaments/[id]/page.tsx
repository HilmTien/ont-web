import { ConvertPlayersToTeamsButton } from "@/components/admin/tournaments/convert-players-to-teams-button";
import { DeleteStageButton } from "@/components/admin/tournaments/delete-stage-button";
import { TournamentStageForm } from "@/components/admin/tournaments/tournament-stage-form";
import { UpdateRanksButton } from "@/components/admin/tournaments/update-rank-button";
import { createServerClient } from "@/lib/server";
import Link from "next/link";

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
    return <>Tourney doesnt exist</>;
  }

  const { data: stages } = await supabase
    .from("tournament_stages")
    .select()
    .eq("tournament_id", tournament.id);

  return (
    <div>
      Tournament info: {JSON.stringify(tournament)}
      <div className="flex gap-4">
        <UpdateRanksButton />
        <ConvertPlayersToTeamsButton tournamentId={id} />
      </div>
      <TournamentStageForm id={id} />
      <table>
        <tbody>
          {stages &&
            stages.map((stage) => (
              <tr className="flex w-screen justify-around" key={stage.id}>
                <td>
                  <DeleteStageButton stage={stage} />
                </td>
                <td>{stage.id}</td>
                <td>{stage.stage_name}</td>
                <td>{stage.stage_index}</td>
                <td>{stage.stage_type}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex flex-col">
        <Link href={`./${id}/mappools`}>Edit Mappool</Link>
        <Link href={`./${id}/schedule`}>Edit Matches</Link>
        <Link href={`./${id}/players`}>Edit Players</Link>
        <Link href={`./${id}/statistics`}>Edit Statistics</Link>
      </div>
    </div>
  );
}
