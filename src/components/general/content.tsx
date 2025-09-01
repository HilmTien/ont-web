import React from "react";

interface ContentProps {
  children: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
  return (
    <div className="bg-content shadow-container z-1 m-2 mx-auto flex max-w-[75%] flex-col p-5">
      {children}
    </div>
  );
}
