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
    </div>
  );
}
