import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";

import counterReducer from "stores/reducers/counter";
import usersReducer from "stores/reducers/user";

const rootReducer = combineReducers({
  counter: counterReducer,
  users: usersReducer
});

const makeStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const storeWrapper = createWrapper(makeStore);
