import * as React from "react";
import { ExtensionState, setExtensionState } from "./state";
import {
  FlattenSearchItem,
  getItems,
  SearchResult as SearchData,
} from "./searchService";
import { VirtualizedList } from "./virtualizedList";

const openTabWithUrl = (item: FlattenSearchItem) =>
  item.type === "BOOKMARK"
    ? chrome.tabs.create({ url: item.url })
    : chrome.tabs.update(Number(item.id), { active: true });

const filterSearchData = (allItems: SearchData, query: string): SearchData => {
  const qq = query.toLocaleLowerCase();
  return {
    bookmakrs: allItems.bookmakrs.filter((b) => b.data.includes(qq)),
    tabs: allItems.tabs.filter((b) => b.data.includes(qq)),
    history: [],
  };
};

const flattenData = (searchData: SearchData): FlattenSearchItem[] => {
  const bookmarks = searchData.bookmakrs.map(
    (b) =>
      ({
        id: b.id,
        type: "BOOKMARK",
        display: b.display,
        url: b.url,
      } as FlattenSearchItem)
  );

  const tabs = searchData.tabs.map(
    (b) =>
      ({
        id: b.id,
        type: "TAB",
        display: b.display,
        url: b.url,
      } as FlattenSearchItem)
  );

  return [...tabs];
};

export function App(props: { initialState: ExtensionState }) {
  const [selectedIndex, setSelectedIndex] = React.useState(
    props.initialState.selectedIndex
  );
  const [queryText, setQueryText] = React.useState(
    props.initialState.queryText
  );

  React.useEffect(
    () => setExtensionState({ selectedIndex, queryText }),
    [selectedIndex, queryText]
  );

  const [searchData, setSearchData] = React.useState<SearchData>({
    bookmakrs: [],
    tabs: [],
    history: [],
  });
  const filteredSearchData = filterSearchData(searchData, queryText);
  const flattenedItems = flattenData(filteredSearchData);

  React.useEffect(() => {
    getItems().then((items) => setSearchData(items));
  }, []);

  const listKeyboardHandler = (e: React.KeyboardEvent<Element>) => {
    const clamp = (index: number) => {
      return Math.max(Math.min(index, flattenedItems.length - 1), 0);
    };

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        const item = flattenedItems[selectedIndex];
        openTabWithUrl(item);
        break;
      case "Down":
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((index) => clamp(index + 1));
        break;
      case "Up":
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((index) => clamp(index - 1));
        break;
      default:
        return;
    }
  };

  return (
    <div className="dropdown-list" onKeyDown={listKeyboardHandler} tabIndex={0}>
      <input
        autoFocus
        onFocus={(e) => e.target.select()}
        value={queryText}
        onChange={(e) => setQueryText(e.target.value)}
      ></input>
      {selectedIndex}
      <VirtualizedList
        itemCount={flattenedItems.length}
        itemHeight={30}
        itemRenderer={(i) => {
          const item = flattenedItems[i];

          return (
            <div
              className="row"
              onClick={() => openTabWithUrl(item)}
              style={{
                color: i === selectedIndex ? "cornflowerblue" : "black",
              }}
            >
              {item.display}
            </div>
          );
        }}
        highlightedIndex={selectedIndex}
        maxHeight={300}
      ></VirtualizedList>
    </div>
  );
}
