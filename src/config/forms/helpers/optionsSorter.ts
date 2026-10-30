export function optionsSorter(options: string[]) {
  const nonNumeric = options.filter((option) => isNaN(Number(option)));
  const numeric = options
    .filter((option) => !isNaN(Number(option)))
    .sort((a, b) => Number(a) - Number(b));

  return [...nonNumeric, ...numeric];
}
