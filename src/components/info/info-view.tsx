import { GeneralInfo } from "./sections/general-info";
import { MatchInfo } from "./sections/match-info";

export function InfoView() {
  return (
    <>
      <GeneralInfo />
      <MatchInfo />
    </>
  );
}
