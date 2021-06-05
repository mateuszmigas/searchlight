export type SearchItemResult = {
  item: SearchItem;
  titleHighlight: string;
  urlHightlight: string;
};

export type SearchItem =
  | {
      id: number;
      type: "TAB";
      title: string;
      url: string;
      titleSearchData: Fuzzysort.Prepared;
      urlSearchData: Fuzzysort.Prepared;
    }
  | {
      id: string;
      type: "BOOKMARK";
      title: string;
      url: string;
      titleSearchData: Fuzzysort.Prepared;
      urlSearchData: Fuzzysort.Prepared;
    };
