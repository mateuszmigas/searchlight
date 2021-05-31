export type SearchItemResult = {
  item: SearchItem;
  displayHighlight: string;
};

export type SearchItem =
  | {
      id: number;
      type: "TAB";
      display: string;
      data: Fuzzysort.Prepared;
    }
  | {
      id: string;
      type: "BOOKMARK";
      display: string;
      url: string;
      data: Fuzzysort.Prepared;
    };
