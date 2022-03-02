import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getIsLoadingApp, getToken, logout } from 'store/slices/userSessionSlice';
import PublicRoutes from 'routing/routes/index.routes';
import AuthRoutes from 'routing/routes/auth.routes';
import PageLoader from 'components/PageLoader/PageLoader';
import { useEffect } from 'react';
import { loadAppAsyncThunk } from 'store/asyncThunk/userSessionAsyncThunk';
import { serverErrorHandler } from 'services/server-error.service';

function App() {
  // get store dispatch
  const dispatch = useAppDispatch();

  // get user session
  const token = useAppSelector(getToken);

  // gets loading state of our app
  const isLoadingApp = useAppSelector(getIsLoadingApp);

  // logout user
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    let mounted = true;

    // makes async request for current user profile and updates user state
    async function loadDataAsync() {
      try {
        // make req4uest to update user  session profile
        await dispatch(loadAppAsyncThunk()).unwrap();
      } catch (e: any) {
        serverErrorHandler(e, logoutHandler);
      }
    }

    // only make request if we have a user token
    if (mounted && token) loadDataAsync();
  }, [token]);

  return (
    <div>
      <PageLoader isVisible={isLoadingApp} fullscreen={true} theme="dark" />
      <BrowserRouter>{token ? <AuthRoutes /> : <PublicRoutes />}</BrowserRouter>
    </div>
  );
}

export default App;
