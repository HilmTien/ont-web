export type ActionError = { error: string };
export type ServerActionResponse<T = void> = Promise<ActionError | T>;

export function isActionError<T>(
  response: Awaited<ServerActionResponse<T>>,
): response is ActionError {
  return (
    typeof response === "object" && response !== null && "error" in response
  );
}
