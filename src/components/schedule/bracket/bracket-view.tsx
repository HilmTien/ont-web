import { StageMatchesQueryData } from "@/lib/schedule/query";

interface BracketViewProps {
  stage: StageMatchesQueryData;
}

export default function BracketView({ stage }: BracketViewProps) {
  return <>{stage.bracket_type === "swiss" ? <p>swiss</p> : null}</>;
}
