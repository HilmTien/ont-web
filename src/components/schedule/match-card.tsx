import { StageMatchesQueryData } from "@/lib/schedule/query";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon } from "../icons/link";

interface MatchCardProps {
  match: StageMatchesQueryData["matches"][number];
}

export function MatchCard({ match }: MatchCardProps) {
  const dateObj = new Date(match.match_time);
  const date = dateObj.toLocaleString("no-NO", {
    day: "2-digit",
    timeZone: "Europe/Oslo",
  });
  const month = dateObj
    .toLocaleString("no-NO", {
      month: "short",
      timeZone: "Europe/Oslo",
    })
    .toUpperCase();
  const day = dateObj
    .toLocaleString("no-NO", {
      weekday: "short",
      timeZone: "Europe/Oslo",
    })
    .toUpperCase()
    .replaceAll(".", "");
  const time = dateObj.toLocaleTimeString("no-NO", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    timeZone: "Europe/Oslo",
  });

  const player1 = match.team1?.team_players[0]?.users;
  const player2 = match.team2?.team_players[0]?.users;

  const avatar1 = (
    <Image
      src={
        player1
          ? `https://a.ppy.sh/${player1.osu_id}`
          : "/profile-pics/avatar-guest.png"
      }
      alt="Team 1 Logo"
      width={0}
      height={0}
      className="w-10 rounded-md md:w-14 xl:w-20"
      sizes="100vw"
    />
  );

  const avatar2 = (
    <Image
      src={
        player2
          ? `https://a.ppy.sh/${player2.osu_id}`
          : "/profile-pics/avatar-guest.png"
      }
      alt="Team 2 Logo"
      width={0}
      height={0}
      className="w-10 rounded-md md:w-14 xl:w-20"
      sizes="100vw"
    />
  );

  return (
    <div className="bg-card shadow-2x m-4 flex flex-col rounded-md px-4 py-2 text-xl shadow-2xl">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="flex flex-row items-center gap-5 text-sm font-semibold lg:h-20 lg:w-30 lg:flex-col lg:justify-center lg:gap-0 xl:h-30 xl:w-40 xl:text-lg">
          <p>{match.tournament_match_id}</p>
          <p>{`${date} ${month} (${day})`}</p>
          <p className="text-sm lg:text-2xl xl:text-4xl">{time}</p>
          {match.mp_id ? (
            <Link
              target="_blank"
              href={`https://osu.ppy.sh/community/matches/${match.mp_id}`}
            >
              <LinkIcon className="ml-auto size-6 min-w-6 stroke-white lg:hidden" />
            </Link>
          ) : (
            <LinkIcon className="stroke-disabled ml-auto size-6 min-w-6 lg:hidden" />
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center md:flex-1">
          <div className="flex flex-1 items-center justify-start gap-2 sm:gap-5">
            {player1 ? (
              <Link
                href={`https://osu.ppy.sh/users/${player1.osu_id}`}
                target="_blank"
              >
                {avatar1}
              </Link>
            ) : (
              avatar1
            )}
            <p className="flex flex-col text-sm font-semibold text-nowrap 2xl:text-lg">
              {match.team1?.name || match.team1_label}
              {player1 && <span>#{player1.rank}</span>}
            </p>
          </div>
          <div className="mx-3 flex items-center justify-center text-2xl font-bold xl:text-3xl 2xl:text-5xl">
            <p>
              {match.team1_score || 0} - {match.team2_score || 0}
            </p>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-5">
            <p className="flex flex-col text-right text-sm font-semibold text-nowrap 2xl:text-lg">
              {match.team2?.name || match.team2_label}
              {player2 && <span>#{player2.rank}</span>}
            </p>
            {player2 ? (
              <Link
                href={`https://osu.ppy.sh/users/${player2.osu_id}`}
                target="_blank"
              >
                {avatar2}
              </Link>
            ) : (
              avatar2
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 pt-2 text-center text-xs sm:flex-nowrap lg:flex-row lg:items-center xl:text-sm">
        <div className="grid grid-cols-2 gap-4 text-nowrap sm:grid-cols-4 lg:w-full">
          <div className="flex flex-col justify-center gap-1 lg:flex-row">
            <p>Dommer:</p>
            <p>{match.referees?.users.username || "N/A"}</p>
          </div>
          <div className="flex flex-col justify-center gap-1 lg:flex-row">
            <p>Strømmer:</p>
            <p>{match.streamers?.users.username || "N/A"}</p>
          </div>
          <div className="flex flex-col justify-center gap-1 lg:flex-row">
            <p>Kommentator:</p>
            <p>{match.commentator1?.users.username || "N/A"}</p>
          </div>
          <div className="flex flex-col justify-center gap-1 lg:flex-row">
            <p>Kommentator:</p>
            <p>{match.commentator2?.users.username || "N/A"}</p>
          </div>
        </div>
        {match.mp_id ? (
          <Link
            target="_blank"
            href={`https://osu.ppy.sh/community/matches/${match.mp_id}`}
          >
            <LinkIcon className="hidden size-6 min-w-6 stroke-white lg:block" />
          </Link>
        ) : (
          <LinkIcon className="stroke-disabled hidden size-6 min-w-6 lg:block" />
        )}
      </div>
    </div>
  );
}
