import { useEffect } from 'react';
import { loadAppAsyncThunk } from 'store/asyncThunk/userSessionAsyncThunk';
import { serverErrorHandler } from 'services/server-error.service';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getToken, getUser, logout } from 'store/slices/userSessionSlice';

/**
 * This hook will fetch user profile data for the logged in user.
 * The data will only be fetched if there is user session token 
 * but no user session profile data
 */
export default function useApp() {
  // get store dispatch
  const dispatch = useAppDispatch();

  // get current user
  const user = useAppSelector(getUser);

  // get user session token
  const token = useAppSelector(getToken);

  // logout user
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(
    () => {
      let mounted = true;

      // makes async request for current user profile and updates user state
      async function loadDataAsync() {
        try {
          // make request to update user  session profile
          await dispatch(loadAppAsyncThunk()).unwrap();
        } catch (e: any) {
          serverErrorHandler(e, logoutHandler);
        }
      }

      // only make request if we have a user token but no user data
      if (mounted && token && !user) loadDataAsync();
    },
    // TODO: Resolve 'react-hooks/exhaustive-deps'
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token, user],
  );
}
