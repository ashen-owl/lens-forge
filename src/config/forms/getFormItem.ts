import { formsList } from "./formsList";

function getFormItemById(id: string) {
  const found = formsList.find((item) => item.id === id);
  if (!found) {
    console.error("I didn't find form with id: " + id);
  }
  return found;
}

export default getFormItemById;
