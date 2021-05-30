import { SearchItem } from "./searchItem";

export const applyQuery = (
  items: SearchItem[],
  query: string
): SearchItem[] => {
  const lowerCaseQuery = query.toLocaleLowerCase();
  return items.filter((i) => i.data.includes(lowerCaseQuery));
};
