export type SearchItem = {
  id: string;
  display: string;
  data: string;
  url: string;
};

export type SearchResult = {
  bookmakrs: SearchItem[];
  tabs: SearchItem[];
  history: SearchItem[];
};

export type FlattenSearchItem =
  | {
      type: "BOOKMARK" | "HISTORY" | "TAB";
      display: string;
      url: string;
    }
  | {
      type: "SECTION";
      display: string;
    };
function flatten(
  data: chrome.bookmarks.BookmarkTreeNode[]
): chrome.bookmarks.BookmarkTreeNode[] {
  const result: chrome.bookmarks.BookmarkTreeNode[] = [];

  for (const item of data) {
    result.push(item);

    if (item.children) {
      result.push(...flatten(item.children));
    }
  }

  return result;
}

export const getItems = async (): Promise<SearchResult> => {
  const bm = await chrome.bookmarks?.getTree();
  const xxx = flatten(bm)
    .filter((i) => !!i.url)
    .map((t) => ({
      id: t.id,
      display: t.title,
      data: t.title.toLocaleLowerCase(),
      url: t.url!,
    }))
    .sort(function (a, b) {
      return ("" + a.display).localeCompare(b.display);
    });

  return {
    bookmakrs: xxx,
    tabs: xxx,
    history: xxx,
  };
};
