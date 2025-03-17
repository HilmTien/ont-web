export function getURL(relativePath: string) {
  return new URL(
    relativePath,
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT || 3000}`
      : "https://ont.osunorge.no",
  );
}
