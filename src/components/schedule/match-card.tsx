import { StageMatchesQueryData } from "@/lib/schedule/query";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon } from "../icons/link";

interface MatchCardProps {
  match: StageMatchesQueryData["matches"][number];
}

export function MatchCard({ match }: MatchCardProps) {
  const dateObj = new Date(match.match_time);
  const date = dateObj.getDate();
  const month = dateObj.toLocaleString("no-NO", { month: "short" }).toUpperCase();
  const day = ["SØN", "MAN", "TIR", "ONS", "TOR", "FRE", "LØR"][
    dateObj.getDay()
  ];
  const time = dateObj.toLocaleTimeString("no-NO", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    timeZone: "Europe/Oslo",
  });

  const player1 = match.team1?.team_players[0]?.users;
  const player2 = match.team2?.team_players[0]?.users;

  return (
    <div className="bg-card shadow-2x m-4 flex flex-col rounded-md text-xl shadow-2xl lg:flex-row lg:items-center">
      <div className="flex flex-row items-center gap-5 p-2 text-sm font-semibold lg:h-30 lg:w-30 lg:flex-col lg:justify-center lg:gap-0 xl:h-40 xl:w-40 xl:text-lg">
        <p>{match.tournament_match_id}</p>
        <p>{`${date}. ${month} (${day})`}</p>
        <p className="text-sm lg:text-2xl xl:text-4xl">{time}</p>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center md:flex-1">
        <div className="flex flex-1 items-center justify-start gap-2 sm:gap-5">
          <Image
            src={player1 ? `https://a.ppy.sh/${player1.osu_id}` : "/profile-pics/avatar-guest.png"}
            alt="Team 1 Logo"
            width={0}
            height={0}
            className="w-10 rounded-md md:w-14 xl:w-20"
            sizes="100vw"
          />
          <p className="flex flex-col text-sm font-semibold 2xl:text-lg">
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
          <p className="flex flex-col text-right text-sm font-semibold 2xl:text-lg">
            {match.team2?.name || match.team2_label}
            {player2 && <span>#{player2.rank}</span>}
          </p>
          <Image
            src={player2 ? `https://a.ppy.sh/${player2.osu_id}` : "/profile-pics/avatar-guest.png"}
            alt="Team 2 Logo"
            width={0}
            height={0}
            className="w-10 rounded-md md:w-14 xl:w-20"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 py-5 text-center text-xs sm:flex-nowrap lg:h-30 lg:w-30 lg:flex-col lg:items-center lg:justify-center xl:h-40 xl:w-40 xl:text-sm">
        {match.mp_id ? (
          <Link
            target="_blank"
            href={`https://osu.ppy.sh/community/matches/${match.mp_id}`}
          >
            <LinkIcon className="size-6 stroke-white" />
          </Link>
        ) : (
          <LinkIcon className="stroke-disabled size-6" />
        )}
        <div className="flex flex-wrap gap-1 lg:flex-col lg:gap-0">
          <p>{match.referees?.users.username || "No referee"}</p>
          <p>{match.streamers?.users.username || "No streamer"}</p>
          <p>{match.commentator1?.users.username || "No commentator"}</p>
          <p>{match.commentator2?.users.username || "No commentator"}</p>
        </div>
      </div>
    </div>
  );
}
