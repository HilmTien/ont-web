import { DropdownMenu } from "radix-ui";
import React from "react";

interface DropdownProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
}

export default function Dropdown({ trigger, children }: DropdownProps) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-24 rounded-md bg-red-800 shadow-2xl">
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
