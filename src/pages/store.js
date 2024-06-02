import { configureStore } from "@reduxjs/toolkit";
import userslice from "../apps/userslice";
console.log(userslice);
export const store = configureStore({
  reducer: {
    user: userslice,
  },
});
