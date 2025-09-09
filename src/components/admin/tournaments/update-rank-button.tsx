"use client";

import { updateRanks } from "@/actions/user";

export function UpdateRanksButton() {
  return <button onClick={updateRanks}>Update ranks</button>;
}
