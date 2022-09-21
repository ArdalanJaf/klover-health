import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contactSlice";
import adminReducer from "./adminSlice";

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    admin: adminReducer,
  },
});
