import { SearchItem } from "./searchItem";

export const applyQuery = (
  items: SearchItem[],
  query: string
): SearchItem[] => {
  const lowerCaseQuery = query.toLocaleLowerCase().trim();

  if (lowerCaseQuery.substring(0, 2) == "b:") {
    const subQuery = lowerCaseQuery.substring(2).trim();
    return items.filter(
      (i) => i.type === "BOOKMARK" && i.data.includes(subQuery)
    );
  } else if (lowerCaseQuery.substring(0, 2) == "t:") {
    const subQuery = lowerCaseQuery.substring(2).trim();
    return items.filter((i) => i.type === "TAB" && i.data.includes(subQuery));
  } else {
    return items.filter((i) => i.data.includes(lowerCaseQuery));
  }
};
