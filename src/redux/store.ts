import { configureStore } from "@reduxjs/toolkit";
import { NumberSlice } from "./numberSlice";
import { authSlice } from "./authSlice";

export const store = configureStore({
  reducer: {
    numberSlice: NumberSlice.reducer,
    AuthSlice: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
