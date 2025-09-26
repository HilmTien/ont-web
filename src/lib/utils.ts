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

export function batchArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function round(value: number, decimals: number = 2) {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function clamp(x: number, min: number, max: number) {
  return Math.min(Math.max(x, min), max);
}

export function omitKey<T extends object, K extends keyof T>(
  obj: T,
  key: K,
): Omit<T, K> {
  const { [key]: _, ...rest } = obj;
  return rest;
}

export function omitKeys<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const rest = { ...obj };
  for (const key of keys) {
    delete rest[key];
  }
  return rest;
}

export function countValues<T extends string | number>(
  record: Record<string, T>,
): Record<T, number> {
  return Object.values(record).reduce(
    (acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    },
    {} as Record<T, number>,
  );
}
