import colorList from "./colorsList";
function getColorItemById(id: string) {
  const found = colorList.find((item) => item.id === id);
  if (!found) {
    console.error("I didn't find color with id: " + id);
  }
  return found;
}

export default getColorItemById;
