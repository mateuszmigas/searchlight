export type ExtensionState = {
  queryText: string;
  selectedIndex: number | null;
};

const defaultState: ExtensionState = {
  queryText: "",
  selectedIndex: null,
};

export const getExtensionState = () =>
  new Promise<ExtensionState>((res) =>
    chrome.storage.sync.get("state", ({ state }) =>
      res({ ...defaultState, ...(state as ExtensionState) })
    )
  );

export const setExtensionState = (state: ExtensionState) =>
  chrome.storage.sync.set({ state });

export const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min;
  else if (value > max) return max;
  else return value;
};

const moveIndex = (current: number, offset: number, max: number) =>
  max > 0 ? clamp(current + offset, 0, max - 1) : null;

export type ExtensionAction =
  | { type: "SET_QUERY"; payload: { value: string } }
  | { type: "SelectNextIndex"; payload: { itemCount: number } }
  | { type: "SelectPreviousIndex"; payload: { itemCount: number } }
  | { type: "SelectFirstIndex"; payload: { itemCount: number } }
  | { type: "SelectLastIndex"; payload: { itemCount: number } };

export const reducer = (
  state: ExtensionState,
  action: ExtensionAction
): ExtensionState => {
  switch (action.type) {
    case "SelectFirstIndex":
      return {
        ...state,
        selectedIndex: action.payload.itemCount > 0 ? 0 : null,
      };
    case "SelectPreviousIndex": {
      return {
        ...state,
        selectedIndex:
          state.selectedIndex != null
            ? moveIndex(state.selectedIndex, -1, action.payload.itemCount)
            : 0,
      };
    }
    case "SelectNextIndex": {
      return {
        ...state,
        selectedIndex:
          state.selectedIndex != null
            ? moveIndex(state.selectedIndex, 1, action.payload.itemCount)
            : 0,
      };
    }
    case "SelectLastIndex":
      return {
        ...state,
        selectedIndex:
          action.payload.itemCount > 0 ? action.payload.itemCount - 1 : null,
      };
    case "SET_QUERY":
      return {
        ...state,
        queryText: action.payload.value,
        selectedIndex: 0,
      };
    default:
      return state;
  }
};
