"use client";

import { deleteMappoolMap } from "@/actions/tournament-mappools";

interface DeleteMapButtonProps {
  id: number;
}

export function DeleteMapButton({ id }: DeleteMapButtonProps) {
  return (
    <button className="w-8 cursor-pointer" onClick={() => deleteMappoolMap(id)}>
      Delete
    </button>
  );
}
