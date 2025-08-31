import { StageMatchesQueryData } from "@/lib/schedule/query";
import Link from "next/link";
import { Link as LinkIcon } from "../icons/link";
import Image from "next/image";

interface MatchCardProps {
  match: StageMatchesQueryData[number];
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="bg-card shadow-2x m-4 mt-14 flex items-center rounded-md text-xl shadow-2xl">
      <div className="flex h-40 w-40 flex-col items-center justify-center font-semibold">
        <p>{match.tournament_match_id}</p>
        <p>14. SEP (SØN)</p>
        <p className="text-4xl">14:00</p>
      </div>

      <div className="flex flex-1 items-center justify-between">
        <div className="flex w-1/3 items-center justify-start gap-5">
          <Image
            src={`https://a.ppy.sh/18382591`}
            alt="Team 1 Logo"
            width={0}
            height={0}
            className="w-40"
            sizes="100vw"
          />
          <span className="font-semibold">{match.team1.name}</span>
        </div>

        <div className="flex w-28 flex-col items-center justify-center text-5xl font-bold">
          <p>
            {match.team1_score || 0} - {match.team2_score || 0}
          </p>
        </div>

        <div className="flex w-1/3 items-center justify-end gap-5">
          <span className="font-semibold">{match.team2.name}</span>
          <Image
            src={`https://a.ppy.sh/18382591`}
            alt="Team 2 Logo"
            width={0}
            height={0}
            className="w-40"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="flex h-40 w-40 flex-col items-center justify-center gap-1 border-l text-center text-sm">
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
        <p>{match.referees?.users.username || "No referee"}</p>
        <p>{match.streamers?.users.username || "No streamer"}</p>
        <p>{match.commentator1?.users.username || "No commentator"}</p>
        <p>{match.commentator2?.users.username || "No commentator"}</p>
      </div>
    </div>
  );
}
