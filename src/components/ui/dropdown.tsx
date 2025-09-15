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
        <DropdownMenu.Content
          sideOffset={5}
          className="bg-content shadow-container z-50 min-w-52 rounded-md"
        >
          {children}
          <DropdownMenu.Arrow className="fill-content" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
