import { DeleteMatchButton } from "@/components/admin/tournaments/delete-match-button";
import { EditMatchForm } from "@/components/admin/tournaments/match-edit";
import { MatchForm } from "@/components/admin/tournaments/match-form";
import {
  getCommentators,
  getMatches,
  getReferees,
  getStages,
  getStreamers,
  getTeams,
} from "@/lib/schedule/query";
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

  const { data: matches } = await getMatches(supabase, { tournamentId: id });

  const { data: streamers } = await getStreamers(supabase, {
    tournamentId: id,
  });

  const { data: commentators } = await getCommentators(supabase, {
    tournamentId: id,
  });

  const { data: referees } = await getReferees(supabase, { tournamentId: id });

  if (!streamers || !commentators || !referees) {
    return <>Error fetching staff data</>;
  }

  const { data: teams } = await getTeams(supabase, { tournamentId: id });

  if (!teams) {
    return <>Error fetching teams</>;
  }

  const { data: stages } = await getStages(supabase, { tournamentId: id });

  if (!stages) {
    return <>Error fetching stages</>;
  }

  return (
    <>
      <MatchForm
        staff={{ commentators, streamers, referees }}
        teams={teams}
        stages={stages}
        tournamentId={id}
      />
      <div className="mt-4">
        {matches &&
          matches
            .toSorted(
              (a, b) =>
                new Date(a.match_time).getTime() -
                new Date(b.match_time).getTime(),
            )
            .map((match) => (
              <div className="flex justify-between" key={match.id}>
                <EditMatchForm
                  key={match.id}
                  staff={{ commentators, streamers, referees }}
                  teams={teams}
                  stages={stages}
                  match={match}
                />
                <DeleteMatchButton match={match} />
              </div>
            ))}
      </div>
    </>
  );
}
