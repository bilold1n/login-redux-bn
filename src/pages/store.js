import { configureStore } from "@reduxjs/toolkit";
import userslice from "../apps/userslice";
import productlice from "../apps/product";
export const store = configureStore({
  reducer: {
    user: userslice,
    product: productlice,
  },
});
