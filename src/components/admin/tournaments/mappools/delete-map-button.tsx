"use client";

import { deleteMappoolMap } from "@/actions/tournament-mappools";

interface DeleteMapButtonProps {
  id: number;
}

export function DeleteMapButton({ id }: DeleteMapButtonProps) {
  return (
    <button className="cursor-pointer" onClick={() => deleteMappoolMap(id)}>
      Delete
    </button>
  );
}
