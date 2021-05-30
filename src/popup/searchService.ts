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

export type FlattenSearchItem = {
  id: string;
  type: "BOOKMARK" | "HISTORY" | "TAB";
  display: string;
  url: string;
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

  const t = await chrome.tabs.query({});
  const tabs = t
    .filter((t) => !!t.title)
    .map((tt) => ({
      id: tt.id?.toString() ?? "",
      display: tt.title!,
      data: tt.title!?.toLocaleLowerCase(),
      url: "test",
    }))
    .sort(function (a, b) {
      return ("" + a.display).localeCompare(b.display);
    });

  console.log("tabs", t);

  return {
    bookmakrs: xxx,
    tabs: tabs,
    history: xxx,
  };
};
