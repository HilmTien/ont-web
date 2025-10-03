"use client";
import { StageMatchesQueryData } from "@/lib/schedule/query";
import React from "react";
import BracketView from "./bracket/bracket-view";
import { MatchCard } from "./match-card";

interface ScheduleViewProps {
  stage: StageMatchesQueryData;
}

export default function ScheduleView({ stage }: ScheduleViewProps) {
  const [view, setView] = React.useState(false);

  return (
    <div className="flex flex-col">
      <button className="ml-auto" onClick={() => setView(!view)}>
        {view ? "Se timeplan" : `Se bracket`}
      </button>
      {view ? (
        <BracketView stage={stage} />
      ) : stage.is_public ? (
        stage.matches.length !== 0 ? (
          stage.matches
            .sort(
              (a, b) =>
                new Date(a.match_time).getTime() -
                new Date(b.match_time).getTime(),
            )
            .map((match) => <MatchCard match={match} key={match.id} />)
        ) : (
          <p className="mx-auto pb-8">Denne runden har ingen matches</p>
        )
      ) : (
        <p className="mx-auto pt-4">Denne runden er ikke offentlig enda</p>
      )}
    </div>
  );
}
