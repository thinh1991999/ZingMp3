import React from "react";
import reducer from "./reducer";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { MvReducer } from "./MvReducer/MvReducer";

export const AppProvider = ({ children }) => {
  const store = createStore(
    combineReducers({
      mv: MvReducer,
      root: reducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return <Provider store={store}>{children}</Provider>;
};
