import fuzzysort from "fuzzysort";

const getAllTabs = async (): Promise<Omit<SearchItem, "data">[]> => {
  const tabs = await chrome.tabs.query({});

  return tabs
    .filter((t) => !!t.title && !!t.id && !t.active)
    .map((t) => ({
      type: "TAB",
      id: t.id!,
      display: t.title!,
    }));
};

const getAllBookmarks = async (): Promise<Omit<SearchItem, "data">[]> => {
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
      display: b.title,
      url: b.url!,
    }));
};

export type SearchItem =
  | {
      id: number;
      type: "TAB";
      display: string;
      data: Fuzzysort.Prepared;
    }
  | {
      id: string;
      type: "BOOKMARK";
      display: string;
      url: string;
      data: Fuzzysort.Prepared;
    };

export const getAllSearchItems = async (): Promise<SearchItem[]> => {
  const tabs = await getAllTabs();
  const bookmarks = await getAllBookmarks();
  return tabs
    .concat(bookmarks)
    .map((i) => ({ ...i, data: fuzzysort.prepare(i.display) } as SearchItem));
};

export const navigateToSearchItem = (item: SearchItem) =>
  item.type === "BOOKMARK"
    ? chrome.tabs.create({ url: item.url })
    : chrome.tabs.update(Number(item.id), { active: true });
