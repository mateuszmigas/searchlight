import { SearchItem } from "./common";

export const navigateToSearchItem = (item: SearchItem) =>
  item.type === "BOOKMARK"
    ? chrome.tabs.create({ url: item.url })
    : chrome.tabs.update(Number(item.id), { active: true });

export function debounce<T extends Function>(
  func: T,
  wait = 500
): T & { cancel: () => void } {
  let timeoutId = 0;
  let callable = Object.assign(
    (...args: any) => {
      if (timeoutId !== null) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => func(...args), wait) as any;
    },
    { cancel: () => clearTimeout(timeoutId) }
  );
  return <T & { cancel: () => void }>(<any>callable);
}
