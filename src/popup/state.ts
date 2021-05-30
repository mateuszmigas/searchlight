import { SearchItem } from "./searchItem";

export type ExtensionState = {
  queryText: string;
  selectedIndex: number;
};

const defaultState: ExtensionState = {
  queryText: "",
  selectedIndex: 0,
};

export const getExtensionState = () =>
  new Promise<ExtensionState>((res) =>
    chrome.storage.sync.get("state", ({ state }) =>
      res({ ...defaultState, ...(state as ExtensionState) })
    )
  );

export const setExtensionState = (state: ExtensionState) =>
  chrome.storage.sync.set({ state });
