import Link from "next/link";
import { BehaviourInfo } from "./sections/behaviour-info";
import { GeneralInfo } from "./sections/general-info";
import { MappoolInfo } from "./sections/mappool-info";
import { MatchInfo } from "./sections/match-info";

export function InfoView() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <GeneralInfo />
      <MatchInfo />
      <MappoolInfo />
      <BehaviourInfo />
      <p className="font-bold">
        Husk at ved usikkerhet kan man alltid spørre i Discorden!
      </p>
      <Link
        href={"https://tcomm.hivie.tn/reports/create"}
        target="_blank"
        className="bg-accent flex w-full items-center justify-center p-3 text-xl"
      >
        Klikk her for å rapportere turneringer
      </Link>
    </div>
  );
}
