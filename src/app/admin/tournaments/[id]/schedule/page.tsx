import { MatchForm } from "@/components/admin/tournaments/match-form";
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

  const { data: matches } = await supabase
    .from("matches")
    .select("*, team1:teams!team1_id(name), team2:teams!team2_id(name)")
    .eq("tournament_id", id);

  return (
    <>
      <MatchForm />
      <table>
        <tbody>
          {matches &&
            matches.map((match) => (
              <tr key={match.id} className="flex flex-row justify-between">
                <td>{match.team1.name}</td>
                <td>{match.team2.name}</td>
                <td>{match.match_time}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
