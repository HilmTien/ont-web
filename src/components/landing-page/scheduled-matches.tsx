import { LandingPageMatchesData } from "@/lib/landing-page/query";
import { formatSecondsToTime } from "@/lib/utils";
import Image from "next/image";
import { connection } from "next/server";

interface ScheduledMatchesProps {
  matches: LandingPageMatchesData;
}

export default async function ScheduledMatches({
  matches,
}: ScheduledMatchesProps) {
  await connection();

  const scheduledMatches = matches
    ?.filter(
      (match) =>
        new Date(match.match_time).getTime() - new Date().getTime() > 0 &&
        !match.team1_score &&
        !match.team2_score,
    )
    .sort(
      (a, b) =>
        new Date(a.match_time).getTime() - new Date(b.match_time).getTime(),
    )
    .slice(0, 4);

  return (
    <div
      className={
        scheduledMatches && scheduledMatches.length !== 0 ? "" : "hidden"
      }
    >
      <p className="border-accent mb-2 border-b-2 pb-2 text-xl font-semibold sm:text-2xl">
        KOMMENDE MATCHES
      </p>
      <div className="flex flex-col gap-2">
        {scheduledMatches
          ? scheduledMatches.map((match) => (
              <div
                key={match.tournament_match_id}
                className="bg-table flex w-full justify-between gap-2 rounded-md p-1.5"
              >
                <div className="flex flex-col items-start text-nowrap sm:flex-row sm:gap-2">
                  <p>{match.tournament_match_id}</p>{" "}
                  <p className="hidden sm:flex">
                    {new Date(match.match_time).toLocaleTimeString("no-NO", {
                      hour12: false,
                      hour: "numeric",
                      minute: "numeric",
                      timeZone: "Europe/Oslo",
                    })}
                  </p>
                  <p className="flex items-center sm:hidden">
                    {formatSecondsToTime(
                      (new Date(match.match_time).getTime() -
                        new Date().getTime()) /
                        1000,
                    )}
                  </p>
                </div>
                <div className="flex gap-5">
                  <div className="flex flex-col items-end gap-2 sm:min-w-80 sm:flex-row sm:justify-between">
                    {
                      <div className="flex items-center justify-center gap-1">
                        <Image
                          src={
                            match.team1
                              ? `https://a.ppy.sh/${match.team1.team_players[0].users.osu_id}`
                              : "/profile-pics/avatar-guest.png"
                          }
                          alt="Team 1 Logo"
                          width={256}
                          height={256}
                          unoptimized
                          className="w-5 rounded-md sm:w-8"
                        />
                        <p className="truncate text-sm font-semibold sm:text-base">
                          {match.team1?.name || match.team1_label}
                        </p>
                      </div>
                    }{" "}
                    {
                      <div className="flex items-center justify-center gap-1">
                        <p className="truncate text-sm font-semibold sm:text-base">
                          {match.team2?.name || match.team2_label}
                        </p>
                        <Image
                          src={
                            match.team2
                              ? `https://a.ppy.sh/${match.team2.team_players[0].users.osu_id}`
                              : "/profile-pics/avatar-guest.png"
                          }
                          alt="Team 1 Logo"
                          width={256}
                          height={256}
                          unoptimized
                          className="w-5 rounded-md sm:w-8"
                        />
                      </div>
                    }
                  </div>
                  <p className="hidden w-16 items-center justify-center sm:flex">
                    {formatSecondsToTime(
                      (new Date(match.match_time).getTime() -
                        new Date().getTime()) /
                        1000,
                    )}
                  </p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
