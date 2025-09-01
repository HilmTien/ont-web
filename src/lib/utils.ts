export function getURL(relativePath: string) {
  return new URL(
    relativePath,
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT || 3000}`
      : "https://ont.osunorge.no",
  );
}

export function removeNullProperties<T extends object>(obj: T): T {
  Object.keys(obj).forEach((key) => {
    const value = obj[key as keyof T];
    if (value === null) {
      delete obj[key as keyof T];
    } else if (typeof value === "object" && value !== null) {
      removeNullProperties(value as object);
    }
  });
  return obj;
}

export function formatSecondsToMMSS(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
