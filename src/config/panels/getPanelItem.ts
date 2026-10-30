import { panelList } from "./panelsList";

function getPanelItemById(id: string) {
  const found = panelList.find((item) => item.id === id);
  return found;
}

export default getPanelItemById;
