import * as React from "react";
import {
  ExtensionState,
  reducer,
  setExtensionState,
  ExtensionAction,
} from "./state";
import { VirtualizedList } from "@mateuszmigas/react-dropdown";

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

const navigateToBookmark = (url: string) => chrome.tabs.create({ url });

export function App(props: { initialState: ExtensionState }) {
  const [state, dispatch] = React.useReducer(
    (state: ExtensionState, action: ExtensionAction) => reducer(state, action),
    props.initialState
  );

  React.useEffect(() => setExtensionState(state), [state]);

  const [bookmarks, setBookmarks] = React.useState<
    { id: string; url: string; title: string }[]
  >([]);

  const { queryText, selectedIndex } = state;
  const filteredOptions = bookmarks.filter((o) =>
    o.title.toLocaleLowerCase().includes(queryText.toLocaleLowerCase())
  );

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

  // const listKeyboardHandler = useDropdownListKeyboardNavigator(dispatch);

  const listKeyboardHandler = React.useMemo(() => {
    const customHandler = (e: React.KeyboardEvent<Element>) => {
      const payload = { itemCount: filteredOptions.length };
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          navigateToBookmark(filteredOptions[selectedIndex!].url);
          break;
        case "Down":
        case "ArrowDown":
          e.preventDefault();
          dispatch({ type: "SelectNextIndex", payload });
          break;
        case "Up":
        case "ArrowUp":
          e.preventDefault();
          dispatch({ type: "SelectPreviousIndex", payload });
          break;
        case "Home": {
          dispatch({ type: "SelectFirstIndex", payload });
          break;
        }
        case "End": {
          dispatch({ type: "SelectLastIndex", payload });
          break;
        }
        default:
          return;
      }
    };

    return customHandler;
  }, [selectedIndex, dispatch, filteredOptions]);

  return (
    <div className="dropdown-list" onKeyDown={listKeyboardHandler} tabIndex={0}>
      <input
        autoFocus
        onFocus={(e) => e.target.select()}
        value={queryText}
        onChange={(e) =>
          dispatch({ type: "SET_QUERY", payload: { value: e.target.value } })
        }
      ></input>
      <VirtualizedList
        itemCount={filteredOptions.length}
        itemHeight={30}
        itemRenderer={(i) => (
          <div
            className="row"
            onClick={() => navigateToBookmark(filteredOptions[i].url)}
            style={{ color: i === selectedIndex ? "green" : "white" }}
          >
            {filteredOptions[i].title}
          </div>
        )}
        highlightedIndex={selectedIndex}
        maxHeight={300}
      ></VirtualizedList>
      <button>Settings</button>
    </div>
  );
}
