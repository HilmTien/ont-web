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
