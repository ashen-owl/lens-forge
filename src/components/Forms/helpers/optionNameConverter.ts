export function optionNameConverter(option: string, id: string) {
  if (id.includes("AXI")) {
    if (isNaN(Number(option))) return option;
    let newOption: string[] = option.split("");
    const maxIndex = 3 - newOption.length;

    for (let i = 0; i < maxIndex; i++) {
      newOption.unshift("0");
    }

    return newOption.join("");
  }
  return option;
}
