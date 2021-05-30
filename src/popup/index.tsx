import * as React from "react";
import { render } from "react-dom";
import { App } from "./components/app";
import { getAllSearchItems } from "./searchItem";
import { getExtensionState } from "./state";

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
