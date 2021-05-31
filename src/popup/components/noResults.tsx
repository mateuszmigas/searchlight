import * as React from "react";
import { translations } from "../translations";

export function NoResults() {
  return (
    <div className="popup-search-no-results">
      {translations.noResultsMessage}
    </div>
  );
}
