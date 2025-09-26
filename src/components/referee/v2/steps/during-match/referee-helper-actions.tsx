import React from "react";
import {
  RefereeHelperDispatchContext,
  RefereeHelperStateContext,
} from "../../referee-helper-state";

export function RefereeHelperActionBar() {
  const state = React.useContext(RefereeHelperStateContext);
  const dispatch = React.useContext(RefereeHelperDispatchContext);

  return (
    <div className="flex justify-evenly gap-2">
      <button
        className="bg-accent disabled:bg-disabled rounded px-2 py-1 hover:cursor-pointer disabled:cursor-default"
        disabled={state.selections.length === 0}
        onClick={() => dispatch({ type: "UNDO_SELECTION" })}
      >
        Undo selection
      </button>
      <button
        className="bg-accent disabled:bg-disabled rounded px-2 py-1 hover:cursor-pointer disabled:cursor-default"
        disabled={state.futureRedoSelections.length === 0}
        onClick={() => dispatch({ type: "REDO_SELECTION" })}
      >
        Redo selection
      </button>
      {/* // TODO: implement later */}
      {/* <button
        className="bg-accent disabled:bg-disabled rounded px-2 py-1 hover:cursor-pointer disabled:cursor-default"
        disabled={state.selections.length === 0}
        onClick={() => dispatch({ type: "RESET_SELECTIONS" })}
      >
        Sync match
      </button> */}
      <button
        className="bg-accent disabled:bg-disabled rounded px-2 py-1 hover:cursor-pointer disabled:cursor-default"
        disabled={state.selections.length === 0}
        onClick={() => dispatch({ type: "RESET_SELECTIONS" })}
      >
        Reset selections
      </button>
    </div>
    // <div className="flex gap-2">
    //   <button
    //     className="text-accent disabled:text-disabled hover:cursor-pointer disabled:cursor-default"
    //     disabled={state.selections.length === 0}
    //     onClick={() => dispatch({ type: "UNDO_SELECTION" })}
    //   >
    //     <Undo />
    //   </button>
    //   <button
    //     className="text-accent disabled:text-disabled hover:cursor-pointer disabled:cursor-default"
    //     disabled={state.futureRedoSelections.length === 0}
    //     onClick={() => dispatch({ type: "REDO_SELECTION" })}
    //   >
    //     <Redo />
    //   </button>
    //   <button
    //     className="text-accent disabled:text-disabled hover:cursor-pointer disabled:cursor-default"
    //     disabled={state.selections.length === 0}
    //     onClick={() => dispatch({ type: "RESET_SELECTIONS" })}
    //   >
    //     <Sync />
    //   </button>
    //   <button
    //     className="text-accent disabled:text-disabled hover:cursor-pointer disabled:cursor-default"
    //     disabled={state.selections.length === 0}
    //     onClick={() => dispatch({ type: "RESET_SELECTIONS" })}
    //   >
    //     <Reset />
    //   </button>
    // </div>
  );
}
