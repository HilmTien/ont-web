"use client";

import { deleteMatch } from "@/actions/schedule";
import { PublicMatchesRow } from "@/generated/zod-schema-types";

interface DeleteMatchButtonProps {
  match: PublicMatchesRow;
}

export function DeleteMatchButton({ match }: DeleteMatchButtonProps) {
  return <button onClick={() => deleteMatch(match)}>Delete</button>;
}
