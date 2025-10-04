import { getPoints, getSelector, getSelectType } from "@/lib/referee/utils";
import Image from "next/image";
import React from "react";
import {
  RefereeHelperDispatchContext,
  RefereeHelperStateContext,
} from "../../referee-helper-state";

export function TeamOverview() {
  const state = React.useContext(RefereeHelperStateContext);
  const dispatch = React.useContext(RefereeHelperDispatchContext);

  if (!state.matchState || !state.selectedStage || !state.selectedMatch) {
    dispatch({ type: "SET_STEP", step: 0 });
    return;
  }

  const team1Name =
    state.selectedMatch.team1?.name ?? state.selectedMatch.team1_label ?? "";
  const team2Name =
    state.selectedMatch.team2?.name ?? state.selectedMatch.team2_label ?? "";

  const teamPoints = getPoints(state.mapWinners);
  const totalPoints = (teamPoints.red ?? 0) + (teamPoints.blue ?? 0);

  const arePicksFinished =
    teamPoints.red >=
      Math.floor(
        (state.selectedStage.best_of ?? Number.POSITIVE_INFINITY) / 2,
      ) &&
    teamPoints.blue >=
      Math.floor((state.selectedStage.best_of ?? Number.POSITIVE_INFINITY) / 2);

  const team1Won =
    teamPoints.red >=
    Math.ceil((state.selectedStage.best_of ?? Number.POSITIVE_INFINITY) / 2);
  const team2Won =
    teamPoints.blue >=
    Math.ceil((state.selectedStage.best_of ?? Number.POSITIVE_INFINITY) / 2);

  const isMatchFinished = team1Won || team2Won;

  const isPointPickMismatched =
    totalPoints - teamPoints.ties !==
    (state.selections.length > 4
      ? Math.max(state.selections.length - 2, 4)
      : state.selections.length);

  return (
    <div className="relative flex">
      {["red", "blue"].map((team) => {
        const avatarHref =
          team === "red"
            ? state.selectedMatch?.team1?.team_players.at(0)
              ? `https://a.ppy.sh/${state.selectedMatch.team1.team_players.at(0)}`
              : "/profile-pics/avatar-guest.png"
            : state.selectedMatch?.team2?.team_players.at(0)
              ? `https://a.ppy.sh/${state.selectedMatch.team2.team_players.at(0)}`
              : "/profile-pics/avatar-guest.png";

        const handleTeamScore = (e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          return;
          // switch (e.button) {
          //   case 0:
          //     team === "red"
          //       ? dispatch({ type: "INCREMENT_TEAM1_SCORE" })
          //       : dispatch({ type: "INCREMENT_TEAM2_SCORE" });
          //     break;
          //   case 2:
          //     team === "red"
          //       ? dispatch({ type: "DECREMENT_TEAM1_SCORE" })
          //       : dispatch({ type: "DECREMENT_TEAM2_SCORE" });
          //     break;
          // }
        };

        return (
          <div
            key={team}
            className={`flex w-1/2 items-center gap-4 ${team === "blue" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`flex items-center gap-4 ${team === "blue" ? "flex-row-reverse" : ""}`}
            >
              <Image
                src={avatarHref}
                alt={`Team ${team} avatar`}
                width={256}
                height={256}
                unoptimized
                className="size-16 rounded-md"
              />
              <div
                className={`flex flex-col ${team === "red" ? "items-start" : "items-end"} justify-around gap-1`}
              >
                <h3
                  className={`${team === "red" ? "text-red" : "text-blue"} truncate text-xl font-semibold`}
                >
                  {team === "red" ? team1Name : team2Name}
                </h3>
                <button
                  className={`flex gap-2 ${team === "blue" ? "flex-row-reverse" : ""}`}
                  onMouseDown={handleTeamScore}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {[
                    ...Array(
                      Math.ceil((state.selectedStage?.best_of ?? 0) / 2),
                    ).keys(),
                  ].map((i) => (
                    <div
                      key={i}
                      className={`${team === "red" ? "border-red" : "border-blue"} size-6 rounded-full border-2 ${i < teamPoints[team as "red" | "blue"] ? `${team === "red" ? "bg-red" : "bg-blue"}` : ""}`}
                    />
                  ))}
                </button>
              </div>
            </div>
            {getSelector(
              state.selections.length,
              state.firstPick,
              state.selectedStage?.best_of ?? undefined,
            ) === team &&
              !isMatchFinished &&
              !isPointPickMismatched &&
              !arePicksFinished && (
                <div
                  className={`${team === "red" ? "bg-red" : "bg-blue"} flex w-16 items-center justify-center justify-self-end rounded-md px-2 py-1 text-lg font-semibold text-white select-none`}
                >
                  {getSelectType(state.selections.length).toUpperCase()}
                </div>
              )}
          </div>
        );
      })}
      {isPointPickMismatched && !arePicksFinished && (
        <div className="pointer-events-none absolute top-0 left-0 flex h-full w-full items-center justify-center">
          <span className="rounded-md bg-black px-2 py-1 text-lg font-semibold select-none">
            Results ({totalPoints - teamPoints.ties}) ≠ Picks (
            {state.selections.length > 4
              ? Math.max(state.selections.length - 2, 4)
              : state.selections.length}
            )
          </span>
        </div>
      )}
      {arePicksFinished && !isMatchFinished && !isPointPickMismatched && (
        <div className="pointer-events-none absolute top-0 left-0 flex h-full w-full items-center justify-center">
          <span className="rounded-md bg-white px-2 py-1 text-lg font-semibold text-black select-none">
            TIEBREAKER
          </span>
        </div>
      )}
      {isMatchFinished && (!isPointPickMismatched || arePicksFinished) && (
        <div className="pointer-events-none absolute top-0 left-0 flex h-full w-full items-center justify-center">
          <span
            className={`rounded-md ${team1Won ? "bg-red" : "bg-blue"} px-2 py-1 text-lg font-semibold select-none`}
          >
            {team1Won
              ? `${team1Name.toUpperCase()} WON`
              : `${team2Name.toUpperCase()} WON`}
          </span>
        </div>
      )}
    </div>
  );
}
