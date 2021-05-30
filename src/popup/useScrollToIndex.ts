import React from "react";
import { FixedSizeList } from "react-window";

export const useScrollListToIndex = (
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
