import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import movieReducer from "../reducers/index";

const store = configureStore(
  {
    reducer: movieReducer,
  },
  applyMiddleware(thunk)
);

export default store;
