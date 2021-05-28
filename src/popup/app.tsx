import * as React from "react";
import {
  useDropdownListKeyboardNavigator,
  useDropdownState,
  VirtualizedList,
} from "@mateuszmigas/react-dropdown";

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

export function App() {
  const [queryText, setQueryText] = React.useState("");

  const [bookmarks, setBookmarks] = React.useState<
    { id: string; url: string; title: string }[]
  >([]);

  const filteredOptions = bookmarks.filter((o) =>
    o.title.toLocaleLowerCase().includes(queryText.toLocaleLowerCase())
  );

  const [state, dispatch] = useDropdownState(
    filteredOptions.length,
    {},
    { highlightedIndex: 0 }
  );

  React.useEffect(() => {
    if (state.highlightedIndex! > 0) dispatch(["HighlightFirstIndex"]);
  }, [queryText]);

  React.useEffect(() => {
    chrome.bookmarks?.getTree().then((bm) => {
      const xxx = flatten(bm)
        .filter((i) => !!i.url)
        .map((t) => ({
          id: t.id,
          title: t.title,
          url: t.url!,
        }))
        .sort(function (a, b) {
          return ("" + a.title).localeCompare(b.title);
        });

      setBookmarks(xxx);
    });
  }, []);

  const listKeyboardHandler = useDropdownListKeyboardNavigator(dispatch);

  return (
    <div className="dropdown-list" onKeyDown={listKeyboardHandler} tabIndex={0}>
      <input
        autoFocus
        value={queryText}
        onChange={(e) => setQueryText(e.target.value)}
      ></input>
      <VirtualizedList
        itemCount={filteredOptions.length}
        itemHeight={30}
        itemRenderer={(i) => (
          <div
            className="row"
            style={{ color: i === state.highlightedIndex ? "green" : "white" }}
          >
            {filteredOptions[i].title}
          </div>
        )}
        highlightedIndex={state.highlightedIndex}
        maxHeight={300}
      ></VirtualizedList>
      <button>Settings</button>
    </div>
  );
}
