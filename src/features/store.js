import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { authApi } from "./authApi";
import { productApi } from './productApi';
import { orderApi } from "./orderApi";

export const store = configureStore({
  reducer: {
    userInfo: userSlice,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(
    [authApi.middleware,
    productApi.middleware,
    orderApi.middleware
    ]),
});