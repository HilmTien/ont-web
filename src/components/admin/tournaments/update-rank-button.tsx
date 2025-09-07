"use client";

import { updateUsers } from "@/actions/user";

interface UpdateUsersButtonProps {
  id: number;
}

export function UpdateUsersButton({ id }: UpdateUsersButtonProps) {
  return <button onClick={() => updateUsers(id)}>Update ranks</button>;
}
