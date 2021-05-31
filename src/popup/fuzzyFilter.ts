import fuzzysort from "fuzzysort";
import { SearchItem, SearchItemResult } from "./common";

const fuzzyFilter = (query: string, items: SearchItem[]) => {
  const results = fuzzysort.go(query, items, { key: "data" });
  return results.map(
    (r) =>
      ({
        item: r.obj,
        displayHighlight: fuzzysort.highlight(r, "<b>", "</b>"),
      } as SearchItemResult)
  );
};

export const filter = (
  items: SearchItem[],
  query: string
): SearchItemResult[] => {
  const lowerCaseQuery = query.toLocaleLowerCase();

  if (lowerCaseQuery.substring(0, 2) == "b:") {
    return fuzzyFilter(
      lowerCaseQuery.substring(2),
      items.filter((i) => i.type === "BOOKMARK")
    );
  } else if (lowerCaseQuery.substring(0, 2) == "t:") {
    return fuzzyFilter(
      lowerCaseQuery.substring(2),
      items.filter((i) => i.type === "TAB")
    );
  } else {
    return fuzzyFilter(lowerCaseQuery, items);
  }
};
