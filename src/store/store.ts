import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userSessionReducer from "./slices/userSessionSlice";
/**
 * Create redux store by combing all the reducer slices
 */
export const store = configureStore({
  reducer: {
    currentUser: userSessionReducer, // Reducer to handle user session data
  },
  devTools: process.env.NODE_ENV === "development" ? true : false, // only enable in dev
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
