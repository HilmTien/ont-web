import { TournamentForm } from "@/components/admin/tournaments/tournament-form";
import { createServerClient } from "@/lib/server";

export default async function Page() {
  const supabase = await createServerClient();

  const { data: tournaments } = await supabase.from("tournaments").select();

  return (
    <>
      <TournamentForm />
      <table>
        <tbody>
          {tournaments &&
            tournaments.map((tournament) => (
              <tr key={tournament.id} className="flex w-screen justify-around">
                <td>{tournament.id}</td>
                <td>{tournament.name}</td>
                <td>{tournament.acronym}</td>
                <td>{tournament.team_size}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
