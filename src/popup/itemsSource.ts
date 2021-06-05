import fuzzysort from "fuzzysort";
import { SearchItem } from "./common";

const getAllTabs = async (): Promise<
  Omit<SearchItem, "titleSearchData" | "urlSearchData">[]
> => {
  const tabs = await chrome.tabs.query({});

  return tabs
    .filter((t) => !!t.title && !!t.url && !!t.id && !t.active)
    .map((t) => ({
      type: "TAB",
      id: t.id!,
      title: t.title!,
      url: t.url!,
    }));
};

const getAllBookmarks = async (): Promise<
  Omit<SearchItem, "titleSearchData" | "urlSearchData">[]
> => {
  const flattenBookmakrs = (
    data: chrome.bookmarks.BookmarkTreeNode[]
  ): chrome.bookmarks.BookmarkTreeNode[] => {
    const result: chrome.bookmarks.BookmarkTreeNode[] = [];

    for (const item of data) {
      result.push(item);

      if (item.children) {
        result.push(...flattenBookmakrs(item.children));
      }
    }

    return result;
  };

  const bookmarks = await chrome.bookmarks?.getTree();
  return flattenBookmakrs(bookmarks)
    .filter((b) => !!b.url)
    .map((b) => ({
      type: "BOOKMARK",
      id: b.id,
      title: b.title,
      url: b.url!,
    }));
};

export const getAllSearchItems = async (): Promise<SearchItem[]> => {
  const tabs = await getAllTabs();
  const bookmarks = await getAllBookmarks();
  return tabs
    .concat(bookmarks)
    .map(
      (i) =>
        ({
          ...i,
          titleSearchData: fuzzysort.prepare(i.title),
          urlSearchData: fuzzysort.prepare(i.url),
        } as SearchItem)
    );
};
