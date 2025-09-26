import { Copy } from "../icons/copy";

export function CommandWithCopy({ command }: { command: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <code className="bg-table rounded px-2 py-1 text-sm">{command}</code>
      {command && command !== "-" && (
        <button
          className="h-4 w-4 p-0 hover:cursor-pointer"
          aria-label="Copy to clipboard"
          onClick={() => {
            if (!command || command === "-") return;
            navigator.clipboard.writeText(command);
          }}
        >
          <Copy className="h-4 w-4" />
        </button>
      )}
    </span>
  );
}
