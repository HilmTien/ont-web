import { StageMatchesQueryData } from "@/lib/schedule/query";
import Link from "next/link";
import { Link as LinkIcon } from "../icons/link";

interface MatchCardProps {
  match: StageMatchesQueryData[number];
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="bg-card flex flex-row items-center p-5">
      <div className="flex h-30 w-60 flex-col items-center">
        <p>{match.tournament_match_id}</p>
        <p>{match.referees?.users.username || "No referee"}</p>
        <p>{match.streamers?.users.username || "No streamer"}</p>
        <p>{match.commentator1?.users.username || "No commentator 1"}</p>
        <p>{match.commentator2?.users.username || "No commentator 2"}</p>
      </div>
      <div className="flex w-full">
        <div className="w-[45%]">{match.team1.name}</div>
        <div className="flex w-[10%] flex-col items-center">
          <p>vs</p>
          <p>
            {match.team1_score || 0} - {match.team2_score || 0}
          </p>
        </div>
        <div className="w-[45%] text-right">{match.team2.name}</div>
      </div>
      <div className="flex size-30 items-center justify-center">
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
      </div>
    </div>
  );
}
