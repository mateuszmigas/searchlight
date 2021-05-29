import * as React from "react";
import { render } from "react-dom";
import { App } from "./app";
import { getExtensionState } from "./state";

getExtensionState().then((state) =>
  render(<App initialState={state} />, document.getElementById("app")!)
);
