import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from 'config/axios.config';
import { hncStoredEmailStr, hncTokenStr, prevPathStorageKey } from 'constants/localstorage.constants';
import { IHustlencodeUser } from 'interfaces/user.interface';
import { loadAppAsyncThunk } from 'store/asyncThunk/userSessionAsyncThunk';
import { RootState } from '../store';

export interface IUserSessionState {
  token: string | null;
  user: IHustlencodeUser | null;
  storedEmailed: string;
  isLoadingApp: boolean;
  previousPath: string;
  history: string[];
}

// initial state for current user session
const initialState: IUserSessionState = {
  token: localStorage[hncTokenStr] || null, // jwt session token
  user: null, // user profile
  storedEmailed: localStorage[hncStoredEmailStr] || '', // holds remember me email
  isLoadingApp: localStorage[hncTokenStr] ? true : false, // tracks if the app doing initial load
  previousPath: localStorage[prevPathStorageKey] || '/',
  history: [],
};

export const userSessionSlice = createSlice({
  name: 'userSession',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // stores login email in storage and redux store
    setStoredEmail: (state, action: PayloadAction<string>) => {
      state.storedEmailed = action.payload;
      localStorage.setItem(hncStoredEmailStr, action.payload);
    },
    // clear login email from storage and redux store
    clearStoredEmail: state => {
      localStorage.removeItem(hncStoredEmailStr);
      state.storedEmailed = '';
    },
    // stores jwt in storage and redux store
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem(hncTokenStr, action.payload);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${action.payload}`; // update auth headers with bearer token
      state.token = action.payload;
    },
    // clear redux store of user data
    logout: state => {
      localStorage.removeItem(hncTokenStr);
      state.token = null;
      state.user = null;
    },
    // updates loading state for our app - app is loading user session data is being requested
    setIsAppLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingApp = action.payload;
    },
    // updates the previous path
    setPath: (state, action: PayloadAction<string>) => {
      state.previousPath = action.payload;
    },
    // appends url to history array and updates the previous path
    pushHistory: (state, action: PayloadAction<string>) => {
      state.history.push(action.payload);
      if (state.history.length > 1) {
        localStorage[prevPathStorageKey] = state.history[state.history.length - 2];
        state.previousPath = state.history[state.history.length - 2];
      }
    },
    // updates user session data
    setUser: (state, action: PayloadAction<IHustlencodeUser>) => {
      state.user = action.payload;
    },
  },
  // add in async reducers for api requests
  extraReducers: builder => {
    builder
      /**
       * Request to load app
       */

      // show loader once request is pending
      .addCase(loadAppAsyncThunk.pending, state => {
        state.isLoadingApp = true;
      })
      // hide loader once requests ends successfully
      .addCase(loadAppAsyncThunk.fulfilled, (state, action) => {
        state.isLoadingApp = false;
        if (action.payload) state.user = action.payload;
      })
      // hide loader once request ends
      .addCase(loadAppAsyncThunk.rejected, state => {
        state.isLoadingApp = false;
      });
  },
});

export const { setStoredEmail, clearStoredEmail, logout, setToken, setPath, pushHistory, setUser } = userSessionSlice.actions;

// accessor for admin user
export const getUser = (state: RootState) => state.currentUser.user;

// accessor for admin user token
export const getToken = (state: RootState) => state.currentUser.token;

// get stored email
export const getEmail = (state: RootState) => state.currentUser.storedEmailed;

// get previous path
export const getPreviousPath = (state: RootState) => state.currentUser.previousPath;

// gets navigation history
export const getHistory = (state: RootState) => state.currentUser.history;

// get loader
export const getIsLoadingApp = (state: RootState) => state.currentUser.isLoadingApp;

export default userSessionSlice.reducer;
