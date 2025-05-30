import { DeleteStageButton } from "@/components/admin/tournaments/delete-stage-button";
import { TournamentStageForm } from "@/components/admin/tournaments/tournament-stage-form";
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
    </div>
  );
}
