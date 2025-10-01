import Image from "next/image";
import Link from "next/link";

interface StaffCardProps {
  username: string;
  osuId: number;
}

export default function StaffCard({ username, osuId }: StaffCardProps) {
  return (
    <li className="p-5">
      <div className="bg-card flex min-h-[50px] w-72 flex-row items-center rounded-md p-2 shadow-2xl">
        <div>
          <Image
            src={`https://a.ppy.sh/${osuId}`}
            alt="Logo"
            width={256}
            height={256}
            unoptimized
            className="w-14 rounded-md"
          />
        </div>

        <div className="ml-2 flex min-w-0 flex-1 flex-row items-center justify-between">
          <Link
            href={`https://osu.ppy.sh/users/${osuId}`}
            target="_blank"
            className="hover:text-accent font-semibold"
          >
            {username}
          </Link>
        </div>
      </div>
    </li>
  );
}
