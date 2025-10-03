"use client";

import { PublicStagesData } from "@/lib/referee/query";
import React from "react";
import {
  RefereeHelperDispatchContext,
  RefereeHelperStateContext,
} from "./referee-helper-state";
import { AfterMatchStep } from "./steps/after-match-step";
import { DuringMatchStep } from "./steps/during-match/during-match-step";
import { SetupLobbyStep } from "./steps/setup-lobby-step";
import { SetupMatchStep } from "./steps/setup-match-step";

interface RefereeHelperV2Props {
  stages: PublicStagesData;
}

export function RefereeHelperV2({ stages }: RefereeHelperV2Props) {
  const state = React.useContext(RefereeHelperStateContext);
  const dispatch = React.useContext(RefereeHelperDispatchContext);

  React.useEffect(() => {
    const initialState = localStorage.getItem("referee-helper-v2");
    if (initialState !== null) {
      const data = JSON.parse(initialState);
      dispatch({ type: "SET_STATE", state: data });
    }
    dispatch({ type: "SET_STAGES", stages });
  }, [dispatch, stages]);

  React.useEffect(() => {
    const saveToLocalStorage = () => {
      if (document.visibilityState == "hidden") {
        localStorage.setItem("referee-helper-v2", JSON.stringify(state));
      }
    };

    // for different devices
    window.addEventListener("visibilitychange", saveToLocalStorage);

    return () => {
      window.removeEventListener("visibilitychange", saveToLocalStorage);
    };
  }, [state]);

  return (
    <div className="flex lg:justify-center">
      {state.step === 0 && <SetupMatchStep />}
      {state.step === 1 && <SetupLobbyStep />}
      {state.step === 2 && <DuringMatchStep />}
      {state.step === 3 && <AfterMatchStep />}
    </div>
  );
}
