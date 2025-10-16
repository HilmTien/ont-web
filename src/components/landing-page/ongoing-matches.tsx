import { LandingPageMatchesData } from "@/lib/landing-page/query";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

interface OngoingMatchesProps {
  matches: LandingPageMatchesData;
}

export default async function OngoingMatches({ matches }: OngoingMatchesProps) {
  await connection();

  const ongoingMatches = matches
    ?.filter(
      (match) =>
        new Date(match.match_time).getTime() - new Date().getTime() < 0 &&
        !match.team1_score &&
        !match.team2_score,
    )
    .sort(
      (a, b) =>
        new Date(a.match_time).getTime() - new Date(b.match_time).getTime(),
    );

  return ongoingMatches && ongoingMatches.length !== 0 ? (
    <div className="mx-auto mt-10 mr-auto flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Pågående matches</h1>
      <div className="flex flex-col gap-2">
        {ongoingMatches.map((match) => (
          <div
            key={match.tournament_match_id}
            className="bg-table flex flex-col justify-between gap-1 rounded-md p-2 sm:min-w-96"
          >
            <div className="flex flex-col">
              <div className="flex gap-2">
                <p>{match.tournament_match_id}</p>
                <p>
                  {new Date(match.match_time).toLocaleTimeString("no-NO", {
                    hour12: false,
                    hour: "numeric",
                    minute: "numeric",
                    timeZone: "Europe/Oslo",
                  })}
                </p>
                {match.stream_link ? (
                  <Link
                    href={match.stream_link}
                    className="hover:text-acc ml-auto flex w-20 items-center gap-1 font-semibold hover:font-bold"
                    target="_blank"
                  >
                    <div className="bg-red h-2.5 w-2.5 rounded-4xl" />
                    DIREKTE
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between sm:flex-row">
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
                    className="w-10 rounded-md"
                  />
                  <p className="font-semibold">
                    {match.team1?.name || match.team1_label}
                  </p>
                </div>
              }
              {
                <div className="flex items-center justify-center gap-1">
                  <p className="font-semibold">
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
                    className="w-10 rounded-md"
                  />
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="border-accent mt-6 aspect-video w-full max-w-full flex-1 overflow-hidden rounded-md border-2 xl:mt-0 xl:max-w-[44%]">
      <Image
        src={"/landing-page/bracket.png"}
        alt="Bracket"
        width={1920}
        height={1080}
      />
    </div>
  );
}
