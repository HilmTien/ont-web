"use client";

import { GetMatchResponse } from "@/lib/osu-api-interfaces/get-match";
import { PublicStagesData } from "@/lib/referee/query";
import { omitKey, omitKeys } from "@/lib/utils";
import React from "react";

interface RefereeHelperState {
  isCorrectLobby: boolean;
  // wasTBPicked: boolean;
  firstPick: "red" | "blue";
  selectedStageId: number | null;
  selectedStage: PublicStagesData[number] | null;
  selectedMatchId: number | null;
  selectedMatch: PublicStagesData[number]["matches"][number] | null;
  selections: PublicStagesData[number]["mappool_maps"];
  futureRedoSelections: PublicStagesData[number]["mappool_maps"];
  stages: PublicStagesData;
  step: number;
  tiebreakerId: number | null;
  // team1Score: number;
  // team2Score: number;
  mapWinners: Record<
    PublicStagesData[number]["mappool_maps"][number]["id"],
    "red" | "blue"
  >;
  futureRedoMapWinners: Record<
    PublicStagesData[number]["mappool_maps"][number]["id"],
    "red" | "blue"
  >;
  matchState: GetMatchResponse | null;
  mpId: number | null;
}

const initialRefereeHelperState: RefereeHelperState = {
  isCorrectLobby: false,
  // wasTBPicked: false,
  firstPick: "blue",
  selectedStageId: null,
  selectedStage: null,
  selectedMatchId: null,
  selectedMatch: null,
  selections: [],
  futureRedoSelections: [],
  stages: [],
  step: 0,
  tiebreakerId: null,
  // team1Score: 0,
  // team2Score: 0,
  mapWinners: {},
  futureRedoMapWinners: {},
  matchState: null,
  mpId: null,
};

type RefereeHelperAction =
  | {
      type: "PUSH_SELECTION";
      selection: PublicStagesData[number]["mappool_maps"][number];
    }
  | { type: "UNDO_SELECTION" }
  | { type: "REDO_SELECTION" }
  | { type: "SET_FIRST_PICK"; firstPick: "red" | "blue" }
  | { type: "SET_STEP"; step: number }
  | { type: "SET_STAGE_ID"; stageId: number | null }
  | { type: "SET_MATCH_ID"; matchId: number | null }
  | { type: "SET_MP_ID"; mpId: number | null }
  | { type: "SET_CORRECT_LOBBY"; isCorrectLobby: boolean }
  | { type: "SET_MATCH_STATE"; matchState: GetMatchResponse | null }
  | { type: "SET_STATE"; state: RefereeHelperState }
  | { type: "SET_STAGES"; stages: PublicStagesData }
  // | { type: "INCREMENT_TEAM1_SCORE" }
  // | { type: "DECREMENT_TEAM1_SCORE" }
  // | { type: "INCREMENT_TEAM2_SCORE" }
  // | { type: "DECREMENT_TEAM2_SCORE" }
  | { type: "SET_MAP_WINNER"; mapId: number; winner: "red" | "blue" }
  | { type: "RESET_SELECTIONS" }
  | { type: "RESET" };

function reducer(state: RefereeHelperState, action: RefereeHelperAction) {
  switch (action.type) {
    case "PUSH_SELECTION": {
      if (
        state.selections.find(
          (selection) => selection.id === action.selection.id,
        )
      ) {
        return state;
      }

      return {
        ...state,
        selections: [...state.selections, action.selection],
        futureRedoSelections:
          action.selection.id === state.futureRedoSelections.at(-1)?.id
            ? state.futureRedoSelections.slice(0, -1)
            : [],
        mapWinners:
          state.futureRedoMapWinners[action.selection.id] === undefined ||
          state.selections.length === 4 ||
          state.selections.length === 5
            ? state.mapWinners
            : {
                ...state.mapWinners,
                [action.selection.id]:
                  state.futureRedoMapWinners[action.selection.id],
              },
        futureRedoMapWinners:
          state.futureRedoMapWinners[action.selection.id] === undefined
            ? state.futureRedoMapWinners
            : omitKey(state.futureRedoMapWinners, action.selection.id),
      };
    }
    case "UNDO_SELECTION": {
      const undo = state.selections.at(-1);

      if (!undo) return state;

      return {
        ...state,
        selections: state.selections.slice(0, -1),
        futureRedoSelections: [...state.futureRedoSelections, undo],
        mapWinners: state.tiebreakerId
          ? omitKeys(state.mapWinners, [undo.id, state.tiebreakerId])
          : omitKey(state.mapWinners, undo.id),
        futureRedoMapWinners: {
          ...state.futureRedoMapWinners,
          [undo.id]: state.mapWinners[undo.id],
        },
      };
    }
    case "REDO_SELECTION": {
      const redo = state.futureRedoSelections.at(-1);

      if (!redo) return state;

      return {
        ...state,
        selections: [...state.selections, redo],
        futureRedoSelections: state.futureRedoSelections.slice(0, -1),
        mapWinners: {
          ...state.mapWinners,
          [redo.id]: state.futureRedoMapWinners[redo.id],
        },
        futureRedoMapWinners: omitKey(state.futureRedoMapWinners, redo.id),
      };
    }
    case "RESET_SELECTIONS":
      return {
        ...state,
        selections: [],
        futureRedoSelections: state.selections.toReversed(),
        mapWinners: {},
        futureRedoMapWinners: state.mapWinners,
        team1Score: 0,
        team2Score: 0,
        wasTBPlayed: false,
      };
    case "SET_FIRST_PICK":
      return { ...state, firstPick: action.firstPick };
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_STAGE_ID": {
      const selectedStage =
        state.stages.find((stage) => stage.id === action.stageId) ?? null;

      return {
        ...state,
        selectedStageId: action.stageId,
        selectedStage: selectedStage,
        selectedMatchId: null,
        mpId: null,
        tiebreakerId:
          selectedStage?.mappool_maps.find((map) => map.map_index === "TB")
            ?.id ?? null,
      };
    }
    case "SET_MATCH_ID":
      return {
        ...state,
        selectedMatchId: action.matchId,
        selectedMatch:
          state.selectedStage?.matches.find(
            (match) => match.id === action.matchId,
          ) ?? null,
      };
    case "SET_MP_ID":
      return { ...state, mpId: action.mpId, isCorrectLobby: false };
    case "SET_CORRECT_LOBBY":
      return { ...state, isCorrectLobby: action.isCorrectLobby };
    case "SET_MATCH_STATE":
      return { ...state, matchState: action.matchState };
    case "SET_STATE":
      return { ...state, ...action.state };
    case "SET_STAGES":
      return { ...state, stages: action.stages };
    case "SET_MAP_WINNER": {
      if (state.mapWinners[action.mapId] === action.winner) {
        return {
          ...state,
          mapWinners: omitKey(state.mapWinners, action.mapId),
        };
      }

      if (state.tiebreakerId && state.tiebreakerId !== action.mapId) {
        return {
          ...state,
          mapWinners: {
            ...omitKey(state.mapWinners, state.tiebreakerId),
            [action.mapId]: action.winner,
          },
        };
      }

      return {
        ...state,
        mapWinners: { ...state.mapWinners, [action.mapId]: action.winner },
      };
    }
    // case "INCREMENT_TEAM1_SCORE": {
    //   const newScore = clamp(
    //     state.team1Score + 1,
    //     0,
    //     Math.ceil(
    //       (state.selectedStage?.best_of ?? Number.POSITIVE_INFINITY) / 2,
    //     ),
    //   );

    //   return {
    //     ...state,
    //     team1Score: newScore,
    //     wasTBPicked:
    //       newScore + state.team2Score === state.selectedStage?.best_of,
    //   };
    // }
    // case "DECREMENT_TEAM1_SCORE": {
    //   const newScore = clamp(
    //     state.team1Score - 1,
    //     0,
    //     Math.ceil(
    //       (state.selectedStage?.best_of ?? Number.POSITIVE_INFINITY) / 2,
    //     ),
    //   );

    //   return {
    //     ...state,
    //     team1Score: newScore,
    //     wasTBPicked:
    //       newScore + state.team2Score === state.selectedStage?.best_of,
    //   };
    // }
    // case "INCREMENT_TEAM2_SCORE": {
    //   const newScore = clamp(
    //     state.team2Score + 1,
    //     0,
    //     Math.ceil(
    //       (state.selectedStage?.best_of ?? Number.POSITIVE_INFINITY) / 2,
    //     ),
    //   );

    //   return {
    //     ...state,
    //     team2Score: newScore,
    //     wasTBPicked:
    //       state.team1Score + newScore === state.selectedStage?.best_of,
    //   };
    // }
    // case "DECREMENT_TEAM2_SCORE": {
    //   const newScore = clamp(
    //     state.team2Score - 1,
    //     0,
    //     state.selectedStage?.best_of ?? Number.POSITIVE_INFINITY,
    //   );

    //   return {
    //     ...state,
    //     team2Score: newScore,
    //     wasTBPicked:
    //       state.team1Score + newScore === state.selectedStage?.best_of,
    //   };
    // }
    case "RESET":
      return { ...initialRefereeHelperState, stages: state.stages };
  }
}

export const RefereeHelperStateContext =
  React.createContext<RefereeHelperState>(initialRefereeHelperState);
export const RefereeHelperDispatchContext = React.createContext<
  React.Dispatch<RefereeHelperAction>
>(() => null);

type RefereeHelperStateProviderProps = { children: React.ReactNode };

export function RefereeHelperStateProvider({
  children,
}: RefereeHelperStateProviderProps) {
  const [RefereeHelperState, dispatch] = React.useReducer(
    reducer,
    initialRefereeHelperState,
  );

  return (
    <RefereeHelperStateContext.Provider value={RefereeHelperState}>
      <RefereeHelperDispatchContext.Provider value={dispatch}>
        {children}
      </RefereeHelperDispatchContext.Provider>
    </RefereeHelperStateContext.Provider>
  );
}
