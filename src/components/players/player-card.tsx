import Image from "next/image";

interface PlayerCardProps {
  username: string;
  osu_id: number;
  registered_at: string;
}

export default function PlayerCard({ username, osu_id }: PlayerCardProps) {
  return (
    <li className="p-5">
      <div className="bg-card flex min-h-[50px] w-60 flex-row items-center rounded-md p-5 shadow-2xl">
        <div>
          <Image
            src={`https://a.ppy.sh/${osu_id}`}
            alt="Logo"
            width={40}
            height={40}
            className="w-10"
          />
        </div>

        <div className="ml-2 flex min-w-0 flex-1 flex-row items-center justify-between font-semibold">
          <a
            href={`https://osu.ppy.sh/users/${osu_id}`}
            target="_blank"
            className="hover:text-accent"
          >
            {username}
          </a>
          <span className="ml-2">#9999</span>
        </div>
      </div>
    </li>
  );
}
