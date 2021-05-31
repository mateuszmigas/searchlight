import { SearchItem } from "./common";

export const navigateToSearchItem = (item: SearchItem) =>
  item.type === "BOOKMARK"
    ? chrome.tabs.create({ url: item.url })
    : chrome.tabs.update(Number(item.id), { active: true });
