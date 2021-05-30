import * as React from "react";
import { ExtensionState, setExtensionState } from "./state";
import { navigateToSearchItem, SearchItem } from "./searchItem";
import { SearchList } from "./searchList";
import { applyQuery } from "./query";

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

  const listKeyboardHandler = (e: React.KeyboardEvent<Element>) => {
    const clamp = (index: number) => {
      return Math.max(Math.min(index, filteredSearchItems.length - 1), 0);
    };

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        const item = filteredSearchItems[selectedIndex];
        navigateToSearchItem(item);
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
        onChange={(e) => {
          setQueryText(e.target.value);
          setSelectedIndex(0);
        }}
      ></input>
      <SearchList
        searchItems={filteredSearchItems}
        selectedIndex={selectedIndex}
        maxHeight={300}
      ></SearchList>
    </div>
  );
}
