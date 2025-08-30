import Image from "next/image";

interface PlayerCardProps {
  username: string;
  osu_id: number;
  registered_at: string;
}

export default function PlayerCard({ username, osu_id }: PlayerCardProps) {
  return (
    <li className="p-5">
      <div className="bg-card flex min-h-[50px] w-72 flex-row items-center rounded-md p-2 shadow-2xl">
        <div>
          <Image
            src={`https://a.ppy.sh/${osu_id}`}
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-14 rounded-md"
          />
        </div>

        <div className="ml-2 flex min-w-0 flex-1 flex-row items-center justify-between">
          <div className="flex flex-col">
            <a
              href={`https://osu.ppy.sh/users/${osu_id}`}
              target="_blank"
              className="hover:text-accent font-semibold"
            >
              {username}
            </a>
            <p className="text-xs">BWS: 1</p>
          </div>

          <span className="ml-2 font-semibold">#9999</span>
        </div>
      </div>
    </li>
  );
}
