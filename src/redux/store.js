import { configureStore } from "@reduxjs/toolkit";
import publicReducer from "./publicSlice";
import adminReducer from "./adminSlice";

export const store = configureStore({
  reducer: {
    public: publicReducer,
    admin: adminReducer,
  },
});
