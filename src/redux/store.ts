import { configureStore } from "@reduxjs/toolkit";
import rooteReducer from "./slice";
const store = configureStore({
  reducer: {
    root: rooteReducer,
  },
});

export default store;
