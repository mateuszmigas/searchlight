const getAllTabs = async (): Promise<SearchItem[]> => {
  const tabs = await chrome.tabs.query({});
  console.log("tabs", tabs);

  return tabs
    .filter((t) => !!t.title && !!t.id && !t.active)
    .map((t) => ({
      type: "TAB",
      id: t.id!,
      display: t.title!,
      data: t.title!.toLocaleLowerCase(),
    }));
};

const getAllBookmarks = async (): Promise<SearchItem[]> => {
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
      data: b.title.toLocaleLowerCase(),
      url: b.url!,
    }));
};

export type SearchItem =
  | {
      id: number;
      type: "TAB";
      display: string;
      data: string;
    }
  | {
      id: string;
      type: "BOOKMARK";
      display: string;
      url: string;
      data: string;
    };

export const getAllSearchItems = async (): Promise<SearchItem[]> => {
  const tabs = await getAllTabs();
  const bookmarks = await getAllBookmarks();
  return tabs
    .concat(bookmarks)
    .sort((a, b) => a.display.localeCompare(b.display));
};

export const navigateToSearchItem = (item: SearchItem) =>
  item.type === "BOOKMARK"
    ? chrome.tabs.create({ url: item.url })
    : chrome.tabs.update(Number(item.id), { active: true });
