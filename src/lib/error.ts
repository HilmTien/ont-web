export type ActionError = { error: string };
export type ServerActionResponse<T = void> = ActionError | T;

export function isActionError<T>(
  response: ServerActionResponse<T>
): response is ActionError {
  return (
    typeof response === "object" && response !== null && "error" in response
  );
}
