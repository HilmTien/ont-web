"use client";

import { getMatch } from "@/actions/referee";
import { CommandWithCopy } from "@/components/ui/command-with-copy";
import { isActionError } from "@/lib/error";
import React from "react";
import {
  RefereeHelperDispatchContext,
  RefereeHelperStateContext,
} from "../referee-helper-state";

export function SetupMatchStep() {
  const state = React.useContext(RefereeHelperStateContext);
  const dispatch = React.useContext(RefereeHelperDispatchContext);

  const finishSetup = () => {
    dispatch({ type: "SET_STEP", step: state.step + 1 });
  };

  const onFetchMatch = async () => {
    const match = await getMatch(state.mpId!);

    if (isActionError(match)) {
      console.error(match.error);
      return;
    }

    dispatch({ type: "SET_MATCH_STATE", matchState: match });
  };

  return (
    <div className="flex flex-auto flex-col gap-4">
      <h2 className="text-2xl font-bold">Setup Referee Helper</h2>
      <label className="mb-2 text-xl">
        <span className="mr-2">Stage:</span>
        <select
          value={state.selectedStageId ?? ""}
          onChange={(e) =>
            dispatch({
              type: "SET_STAGE_ID",
              stageId: e.target.value === "" ? null : Number(e.target.value),
            })
          }
          className="rounded border p-2"
        >
          <option value={""}>-</option>
          {state.stages.map((stage) => {
            return (
              <option
                key={stage.id}
                value={stage.id}
              >{`${stage.stage_name}`}</option>
            );
          })}
        </select>
      </label>
      {state.selectedStage && (
        <label className="mb-2 text-xl">
          <span className="mr-2">Match:</span>
          <select
            value={state.selectedMatchId ?? ""}
            onChange={(e) =>
              dispatch({
                type: "SET_MATCH_ID",
                matchId: e.target.value === "" ? null : Number(e.target.value),
              })
            }
            className="rounded border p-2"
          >
            <option value={""}>-</option>
            {state.selectedStage.matches
              .toSorted(
                (a, b) =>
                  new Date(a.match_time).getTime() -
                  new Date(b.match_time).getTime(),
              )
              .map((match) => {
                return (
                  <option
                    key={match.id}
                    value={match.id}
                  >{`(${match.tournament_match_id}) ${match.team1?.name || match.team1_label} vs ${match.team2?.name || match.team2_label}`}</option>
                );
              })}
          </select>
        </label>
      )}
      {state.selectedMatch && (
        <>
          <div>
            <span className="mr-2 text-xl">Make lobby:</span>
            <CommandWithCopy
              command={`!mp make o!NT: (${state.selectedMatch.team1?.name ?? state.selectedMatch.team1_label}) vs (${state.selectedMatch.team2?.name ?? state.selectedMatch.team2_label})`}
            />
          </div>
          <label>
            <span className="mr-2 text-xl">Multiplayer ID:</span>
            <input
              type="number"
              value={state.mpId ?? ""}
              onChange={(e) =>
                dispatch({
                  type: "SET_MP_ID",
                  mpId: e.target.value === "" ? null : Number(e.target.value),
                })
              }
              className="bg-table rounded p-2"
            />
          </label>
          <button
            disabled={
              state.mpId === null || state.matchState?.match.id === state.mpId
            }
            onClick={onFetchMatch}
            className="disabled:bg-disabled bg-accent rounded p-2 text-white"
          >
            Fetch match data
          </button>
          {state.matchState?.match.id === state.mpId && (
            <label>
              <input
                type="checkbox"
                checked={state.isCorrectLobby}
                onChange={(e) =>
                  dispatch({
                    type: "SET_CORRECT_LOBBY",
                    isCorrectLobby: e.target.checked,
                  })
                }
              />
              <span className="ml-2 text-xl">
                Is this the right lobby? {state.matchState.match.name}
              </span>
            </label>
          )}
        </>
      )}
      <button
        disabled={
          state.selectedStageId === null ||
          state.selectedMatchId === null ||
          state.matchState === null ||
          state.matchState?.match.id !== state.mpId ||
          !state.isCorrectLobby
        }
        onClick={finishSetup}
        className="disabled:bg-disabled bg-accent rounded p-2 text-white hover:cursor-pointer disabled:cursor-default"
      >
        Start Referee Helper
      </button>
    </div>
  );
}
