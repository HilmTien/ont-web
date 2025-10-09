import { Tooltip } from "radix-ui";

interface DropdownProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
}

export default function ToolTip({ trigger, children }: DropdownProps) {
  return (
    <Tooltip.Root delayDuration={100}>
      <Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="bg-content shadow-container z-50 rounded-md px-3 py-2"
          sideOffset={5}
          side="bottom"
        >
          {children}
          <Tooltip.Arrow className="fill-content" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
