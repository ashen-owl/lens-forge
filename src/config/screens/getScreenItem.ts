import { screenList } from "./screenList";

function getScreenItemById(id: string) {
  const found = screenList.find((item) => item.id === id);
  if (!found) {
    console.error("I didn't find screen with id: " + id);
  }
  return found;
}

export default getScreenItemById;
