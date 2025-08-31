import Image from "next/image";
import Link from "next/link";

interface PlayerCardProps {
  username: string;
  osuId: number;
  registeredAt: string;
  rank: number;
  accuracy: number;
  pp: number;
  playCount: number;
  maximumCombo: number;
}

export default function PlayerCard({
  username,
  osuId,
  rank,
  accuracy,
  pp,
  playCount,
  maximumCombo,
  registeredAt,
}: PlayerCardProps) {
  const dateObj = new Date(registeredAt);

  const date = dateObj.getDate();
  const month = dateObj.getMonth();
  const time = dateObj.toLocaleTimeString("no", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <li className="p-5">
      <div className="bg-card flex w-72 flex-col rounded-md p-3 shadow-md">
        <div className="flex items-center">
          <Image
            src={`https://a.ppy.sh/${osuId}`}
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-14 rounded-md"
          />

          <div className="ml-3 flex flex-1 items-center justify-between">
            <Link
              href={`https://osu.ppy.sh/users/${osuId}`}
              target="_blank"
              className="hover:text-accent font-semibold"
            >
              {username}
            </Link>
            <span className="ml-2 font-semibold">BWS: 1</span>
          </div>
        </div>

        <details className="mt-2 cursor-pointer text-xs">
          <summary>Detaljer</summary>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
            <p>Rank: {rank}</p>
            <p>Accuracy: {accuracy}</p>
            <p>PP: {pp}</p>
            <p>Play Count: {playCount}</p>
            <p>Max Combo: {maximumCombo}</p>
            <p>
              Reg: {date}/{month} {time}
            </p>
          </div>
        </details>
      </div>
    </li>
  );
}
