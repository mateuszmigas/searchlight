import * as React from "react";
import { render } from "react-dom";
import { App } from "./components/app";
import { getAllSearchItems } from "./itemsSource";
import { getExtensionState } from "./extensionState";

const run = async () => {
  const [state, items] = await Promise.all([
    getExtensionState(),
    getAllSearchItems(),
  ]);

  render(
    <App initialState={state} searchItems={items} />,
    document.getElementById("app")!
  );
};

run();
