import React from "react";
import { FixedSizeList } from "react-window";
import { navigateToSearchItem, SearchItem } from "./searchItem";

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
  data: {
    searchItems: SearchItem[];
    selectedIndex: number;
  };
}) {
  const {
    index,
    data: { searchItems, selectedIndex },
  } = props;

  const searchItem = searchItems[index];

  return (
    <div
      className="row"
      onClick={() => navigateToSearchItem(searchItem)}
      style={{
        color: index === selectedIndex ? "cornflowerblue" : "black",
      }}
    >
      {searchItem.display}
    </div>
  );
});

const itemHeight = 30;

export function SearchList(props: {
  searchItems: SearchItem[];
  selectedIndex: number;
  maxHeight: number;
  className?: string;
}) {
  const { searchItems, selectedIndex, maxHeight, className } = props;

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
      className={className}
      ref={listRef}
      height={height}
      itemCount={itemCount}
      itemSize={itemHeight}
      width={"100%"}
      itemData={{
        searchItems,
        selectedIndex,
      }}
    >
      {memoizedRow}
    </FixedSizeList>
  );
}
