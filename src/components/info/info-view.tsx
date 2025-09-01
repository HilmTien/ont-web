import { GeneralInfo } from "./sections/general-info";
import { MatchInfo } from "./sections/match-info";

export function InfoView() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <GeneralInfo />
      <MatchInfo />
    </div>
  );
}
