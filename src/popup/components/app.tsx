import * as React from "react";
import { ExtensionState, setExtensionState } from "../state";
import { navigateToSearchItem, SearchItem } from "../searchItem";
import { SearchList } from "./searchList";
import { applyQuery } from "../query";
import { NoResults } from "./noResults";

export function App(props: {
  initialState: ExtensionState;
  searchItems: SearchItem[];
}) {
  const { initialState, searchItems } = props;

  const [selectedIndex, setSelectedIndex] = React.useState(
    initialState.selectedIndex
  );
  const [queryText, setQueryText] = React.useState(initialState.queryText);

  React.useEffect(
    () => setExtensionState({ selectedIndex, queryText }),
    [selectedIndex, queryText]
  );

  const filteredSearchItems = applyQuery(searchItems, queryText);

  const listKeyboardHandler = React.useCallback(
    (e: React.KeyboardEvent<Element>) => {
      const clamp = (index: number) => {
        return Math.max(Math.min(index, filteredSearchItems.length - 1), 0);
      };

      switch (e.key) {
        case "Enter":
          e.preventDefault();
          const item = filteredSearchItems[selectedIndex];
          navigateToSearchItem(item.item);
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
    },
    [filteredSearchItems, selectedIndex]
  );

  return (
    <div className="popup-main" onKeyDown={listKeyboardHandler} tabIndex={0}>
      <input
        className="popup-search-input"
        autoFocus
        placeholder={"Search tabs and bookmarks"}
        onFocus={(e) => e.target.select()}
        value={queryText}
        onChange={(e) => {
          setQueryText(e.target.value);
          setSelectedIndex(0);
        }}
      ></input>
      {filteredSearchItems.length > 0 ? (
        <SearchList
          searchItems={filteredSearchItems}
          selectedIndex={selectedIndex}
        ></SearchList>
      ) : (
        <NoResults></NoResults>
      )}
    </div>
  );
}
