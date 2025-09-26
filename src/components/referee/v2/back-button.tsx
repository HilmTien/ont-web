import React from "react";
import {
  RefereeHelperDispatchContext,
  RefereeHelperStateContext,
} from "./referee-helper-state";

export function BackButton() {
  const state = React.useContext(RefereeHelperStateContext);
  const dispatch = React.useContext(RefereeHelperDispatchContext);

  return (
    <button
      className="bg-accent ml-2 self-end rounded p-2 hover:cursor-pointer"
      onClick={() => dispatch({ type: "SET_STEP", step: state.step - 1 })}
    >
      Go back
    </button>
  );
}
