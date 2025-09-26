import { Separator as RadixSeparator } from "radix-ui";

type SeparatorProps = React.ComponentPropsWithoutRef<
  typeof RadixSeparator.Root
>;

export function Separator(props: SeparatorProps) {
  return (
    <RadixSeparator.Root
      {...props}
      className={
        "bg-accent data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px " +
        (props.className ?? "")
      }
    />
  );
}
