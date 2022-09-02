import React from "react";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { MvReducer } from "./MvReducer/MvReducer";
import { RootReducer } from "./RootReducer/RootReducer";
import { SongReducer } from "./SongReducer/SongReducer";
import { EventReducer } from "./EventReducer/EventReducer";

export const AppProvider = ({ children }) => {
  const store = createStore(
    combineReducers({
      mv: MvReducer,
      root: RootReducer,
      song: SongReducer,
      event: EventReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return <Provider store={store}>{children}</Provider>;
};
