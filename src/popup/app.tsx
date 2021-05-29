import * as React from "react";
import { ExtensionState, setExtensionState } from "./state";
import { VirtualizedList } from "@mateuszmigas/react-dropdown";
import {
  FlattenSearchItem,
  getItems,
  SearchResult as SearchData,
} from "./searchService";

const openTabWithUrl = (url: string) => chrome.tabs.create({ url });

const filterSearchData = (allItems: SearchData, query: string): SearchData => {
  const qq = query.toLocaleLowerCase();
  return {
    bookmakrs: allItems.bookmakrs.filter((b) => b.data.includes(qq)),
    tabs: [],
    history: [],
  };
};

const flattenData = (searchData: SearchData): FlattenSearchItem[] => {
  const bookmarkTitle: FlattenSearchItem = {
    type: "SECTION",
    display: "Bookmarks",
  };
  const tabsTitle: FlattenSearchItem = {
    type: "SECTION",
    display: "Tabs",
  };
  const bookmarks = searchData.bookmakrs
    .map(
      (b) =>
        ({
          type: "BOOKMARK",
          display: b.display,
          url: b.url,
        } as FlattenSearchItem)
    )
    .slice(0, 5);

  return [bookmarkTitle, ...bookmarks, tabsTitle, ...bookmarks];
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
    const isSection = (index: number) =>
      flattenedItems[index]?.type === "SECTION";
    const clamp = (index: number) => {
      if (index > flattenedItems.length - 1) {
        return flattenedItems.length - 1;
      }
      if (index <= 0) {
        return isSection(0) ? 1 : 0;
      }
      return index;
    };

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        const item = flattenedItems[selectedIndex];
        if (item.type !== "SECTION") openTabWithUrl(item.url);
        break;
      case "Down":
      case "ArrowDown":
        e.preventDefault();

        setSelectedIndex((index) =>
          clamp(index + (isSection(index + 1) ? 2 : 1))
        );

        break;
      case "Up":
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((index) => {
          console.log("checkin", index);
          if (index === 0) {
            return index;
          }
          if (isSection(index - 1)) {
            if (index === 1) {
              return index;
            } else {
              return index - 2;
            }
          }
          return index - 1;
        });
        break;
      case "Home": {
        setSelectedIndex(clamp(0));
        break;
      }
      case "End": {
        setSelectedIndex(clamp(flattenedItems.length));
        break;
      }
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

          if (item.type === "SECTION") {
            return <div className="row">{item.display}</div>;
          } else
            return (
              <div
                className="row"
                onClick={() => openTabWithUrl(item.url)}
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
