const decimalPlaces = (value: number): number => {
  const text = String(value);
  const dot = text.indexOf(".");
  return dot === -1 ? 0 : text.length - dot - 1;
};

export function optionCreatorByStep(
  min: number,
  max: number,
  step: number
): string[] {
  const precision = Math.max(
    decimalPlaces(min),
    decimalPlaces(max),
    decimalPlaces(step)
  );
  let currentLevel = min;
  const arr: string[] = [];

  while (currentLevel <= max) {
    arr.push(String(Number(currentLevel.toFixed(precision))));
    currentLevel = Number((currentLevel + step).toFixed(precision));
  }

  return arr;
}
