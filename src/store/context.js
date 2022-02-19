import React, { useState } from "react";
import reducer from "./reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

export const AppProvider = ({ children }) => {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return <Provider store={store}>{children}</Provider>;
};
