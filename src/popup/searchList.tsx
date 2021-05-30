import React from "react";
import { FixedSizeList } from "react-window";
import { navigateToSearchItem, SearchItem } from './searchItem';

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
    itemRenderer: (index: number) => JSX.Element;
  };
}) {
  const {
    index,
    style,
    data: { itemRenderer },
  } = props;

  return <div style={style}>{itemRenderer(index)}</div>;
});

export function SearchListItem(props: { searchItem: SearchItem }) {
  const { searchItem} = props;
    return (
      <div
        className="row"
        onClick={() => navigateToSearchItem(searchItem)}
        style={{
          color: i === selectedIndex ? "cornflowerblue" : "black",
        }}
      >
        {item.display}
      </div>
    );
  }}
}

export function SearchList(props: {
  itemCount: number;
  itemHeight: number;
  maxHeight: number;
  itemRenderer: (index: number) => JSX.Element;
  highlightedIndex: number | null;
  width?: number | string;
  className?: string;
}) {
  const {
    itemCount,
    itemHeight,
    maxHeight,
    itemRenderer,
    width = "100%",
    className,
  } = props;

  const height = Math.min(itemCount * itemHeight, maxHeight);
  const itemData = React.useMemo(
    () => ({
      itemRenderer,
    }),
    [itemRenderer]
  );

  const listRef = React.useRef<FixedSizeList>(null);
  useScrollListToIndex(listRef, props.highlightedIndex);

  return (
    <FixedSizeList
      className={className}
      ref={listRef}
      height={height}
      itemCount={itemCount}
      itemSize={itemHeight}
      width={width}
      itemData={itemData}
    >
      {memoizedRow}
    </FixedSizeList>
  );
}
