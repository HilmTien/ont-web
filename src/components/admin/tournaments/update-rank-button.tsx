"use client";

import { updateUsers } from "@/actions/user";

export function UpdateUsersButton() {
  return <button onClick={updateUsers}>Update ranks</button>;
}
