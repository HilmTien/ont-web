export function getSelector(
  index: number,
  firstPicker: "red" | "blue",
  bestOf?: number,
) {
  if (index < 0) {
    return undefined;
  }

  if (index - 1 >= (bestOf ?? Number.POSITIVE_INFINITY)) {
    return undefined;
  }

  const secondPicker = firstPicker === "red" ? "blue" : "red";

  const relativePosition = index % 2;

  // flip direction after 4 picks
  if (index < 4) {
    return relativePosition === 0 ? firstPicker : secondPicker;
  } else {
    return relativePosition === 0 ? secondPicker : firstPicker;
  }
}

export function getSelectType(index: number) {
  return index < 4 || index > 5 ? "pick" : "ban";
}

export const getModCommand = (mods: string | null) => {
  return mods === null || mods === "NM"
    ? "NF"
    : mods === "FM"
      ? "Freemod"
      : mods === "HDHR"
        ? "NF HD HR"
        : `NF ${mods}`;
};
