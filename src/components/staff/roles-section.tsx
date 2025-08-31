import React from "react";

interface RolesSectionProps {
  role: string;
  children: React.ReactNode;
}

export default function RolesSection({ role, children }: RolesSectionProps) {
  return (
    <section className="flex flex-col">
      <h1 className="text-2xl font-semibold">{role}</h1>
      <ol className="flex flex-wrap">{children}</ol>
    </section>
  );
}
