import Content from "@/components/general/content";
import RolesSection from "@/components/staff/roles-section";
import StaffCard from "@/components/staff/staff-card";
import {
  getCommentators,
  getReferees,
  getStreamers,
} from "@/lib/schedule/query";
import { createServerClient } from "@/lib/server";

export default async function Page() {
  const supabase = await createServerClient();

  const { data: referees } = await getReferees(supabase, { tournamentId: 1 });
  const { data: streamers } = await getStreamers(supabase, { tournamentId: 1 });
  const { data: commentators } = await getCommentators(supabase, {
    tournamentId: 1,
  });
  const developers = [
    { username: "Defectum", osuId: 8631719 },
    { username: "ngo", osuId: 12513942 },
    { username: "TonyWorep", osuId: 16204122 },
  ];

  return (
    <Content>
      <div className="flex flex-col gap-2">
        <RolesSection role="Utviklere">
          {developers.map((developer) => (
            <StaffCard
              key={developer.osuId}
              username={developer.username}
              osuId={developer.osuId}
            />
          ))}
        </RolesSection>
        {referees ? (
          <RolesSection role="Dommere">
            {referees.map((referee) => (
              <StaffCard
                key={referee.users.osu_id}
                username={referee.users.username}
                osuId={referee.users.osu_id}
              />
            ))}
          </RolesSection>
        ) : null}
        {streamers ? (
          <RolesSection role="Strømmere">
            {streamers.map((streamer) => (
              <StaffCard
                key={streamer.users.osu_id}
                username={streamer.users.username}
                osuId={streamer.users.osu_id}
              />
            ))}
          </RolesSection>
        ) : null}
        {commentators ? (
          <RolesSection role="Kommentatorer">
            {commentators.map((commentator) => (
              <StaffCard
                key={commentator.users.osu_id}
                username={commentator.users.username}
                osuId={commentator.users.osu_id}
              />
            ))}
          </RolesSection>
        ) : null}
      </div>
    </Content>
  );
}
