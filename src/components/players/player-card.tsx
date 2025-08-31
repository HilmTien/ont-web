import Image from "next/image";
import Link from "next/link";

interface PlayerCardProps {
  username: string;
  osuId: number;
  rank: number | null;
}

export default function PlayerCard({ username, osuId, rank }: PlayerCardProps) {
  return (
    <li className="p-5">
      <div className="bg-card flex min-h-[50px] w-72 flex-row items-center rounded-md p-2 shadow-2xl">
        <div>
          <Image
            src={`https://a.ppy.sh/${osuId}`}
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-14 rounded-md"
          />
        </div>

        <div className="ml-2 flex min-w-0 flex-1 flex-row items-center justify-between">
          <div className="flex flex-col">
            <Link
              href={`https://osu.ppy.sh/users/${osuId}`}
              target="_blank"
              className="hover:text-accent font-semibold"
            >
              {username}
            </Link>
            <p className="text-xs">{`BWS: ${rank}`}</p>
          </div>

          <span className="ml-2 font-semibold">{`#${rank}`}</span>
        </div>
      </div>
    </li>
  );
}
