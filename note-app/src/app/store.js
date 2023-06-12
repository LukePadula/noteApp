import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./Slices/AppSlice";

export const store = configureStore({
  reducer: {
    appSlice: appSlice,
  },
});
