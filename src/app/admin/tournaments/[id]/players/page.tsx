import { RemoveRegistrantButton } from "@/components/admin/tournaments/remove-registrant-button";
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

  const { data: registrations } = await supabase
    .from("registrations")
    .select("registered_at, user_id, tournament_id, users(username)")
    .eq("tournament_id", id);

  if (!registrations) {
    return <div>An error occured</div>;
  }

  return (
    <ol>
      {registrations.map((registration) => (
        <li className="flex w-full justify-between" key={registration.user_id}>
          <RemoveRegistrantButton
            userId={registration.user_id}
            tournamentId={registration.tournament_id}
          />
          <div>{registration.users.username}</div>
          <div>{registration.registered_at}</div>
        </li>
      ))}
    </ol>
  );
}
