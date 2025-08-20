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
    .select("registered_at, users(username, osu_id)")
    .eq("tournament_id", id);

  if (!registrations) {
    return <div>An error occured</div>;
  }

  return (
    <ol>
      {registrations.map((registration) => (
        <li
          className="flex w-full justify-between"
          key={registration.users.osu_id}
        >
          <div>{registration.users.username}</div>
          <div>{registration.registered_at}</div>
        </li>
      ))}
    </ol>
  );
}
