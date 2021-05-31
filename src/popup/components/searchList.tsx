import React from "react";
import { FixedSizeList } from "react-window";
import { SearchItemResult } from "../common";
import { navigateToSearchItem } from "../utils";

const useScrollListToIndex = (
  elementRef: React.RefObject<FixedSizeList>,
  index: number | null
) => {
  React.useEffect(() => {
    if (index !== null && elementRef.current) {
      const element = elementRef.current;
      (element as FixedSizeList).scrollToItem(index, "smart");
    }
  }, [index]);
};

const memoizedRow = React.memo(function ListRow(props: {
  index: number;
  style: React.CSSProperties;
  data: {
    searchItems: SearchItemResult[];
    selectedIndex: number;
  };
}) {
  const {
    index,
    style,
    data: { searchItems, selectedIndex },
  } = props;

  const searchItem = searchItems[index];

  return (
    <div style={style}>
      <div
        className={`popup-search-list-item ${
          index === selectedIndex ? "popup-search-list-item-selected" : ""
        } popup-search-list-item-${
          searchItem.item.type === "BOOKMARK" ? "bookmark" : "tab"
        }`}
        onClick={() => navigateToSearchItem(searchItem.item)}
        dangerouslySetInnerHTML={{ __html: searchItem.displayHighlight }}
      ></div>
    </div>
  );
});

export function SearchList(props: {
  searchItems: SearchItemResult[];
  selectedIndex: number;
}) {
  const { searchItems, selectedIndex } = props;
  const itemHeight = 30;
  const maxHeight = 300;
  const itemCount = searchItems.length;
  const height = Math.min(itemCount * itemHeight, maxHeight);
  const itemData = React.useMemo(
    () => ({
      searchItems,
      selectedIndex,
    }),
    [searchItems, selectedIndex]
  );

  const listRef = React.useRef<FixedSizeList>(null);
  useScrollListToIndex(listRef, selectedIndex);

  return (
    <FixedSizeList
      className="popup-search-list"
      ref={listRef}
      height={height}
      itemCount={itemCount}
      itemSize={itemHeight}
      width={"100%"}
      itemData={itemData}
    >
      {memoizedRow}
    </FixedSizeList>
  );
}
