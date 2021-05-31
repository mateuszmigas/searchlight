import { SearchItem } from "./searchItem";
import fuzzysort from "fuzzysort";

export type SearchResult = {
  item: SearchItem;
  displayHighlight: string;
};
export const applyQuery = (
  items: SearchItem[],
  query: string
): SearchResult[] => {
  //const mystuff = [{ file: "Monitor.cpp" }, { file: "MeshRenderer.cpp" }];
  const lowerCaseQuery = query.toLocaleLowerCase().trim();

  // if (lowerCaseQuery.substring(0, 2) == "b:") {
  //   const subQuery = lowerCaseQuery.substring(2).trim();
  //   return items.filter(
  //     (i) => i.type === "BOOKMARK" && i.data.includes(subQuery)
  //   );
  // } else if (lowerCaseQuery.substring(0, 2) == "t:") {
  //   const subQuery = lowerCaseQuery.substring(2).trim();
  //   return items.filter((i) => i.type === "TAB" && i.data.includes(subQuery));
  // } else {
  const results = fuzzysort.go(lowerCaseQuery, items, { key: "data" });
  return results.map(
    (r) =>
      ({
        item: r.obj,
        displayHighlight: fuzzysort.highlight(r, "<b>", "</b>"),
      } as SearchResult)
  );
  //return items.filter((i) => i.data.includes(lowerCaseQuery));
  //}
};
