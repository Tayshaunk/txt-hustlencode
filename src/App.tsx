import { BrowserRouter } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { getIsLoadingApp, getToken } from 'store/slices/userSessionSlice';
import PublicRoutes from 'routing/routes/index.routes';
import AuthRoutes from 'routing/routes/auth.routes';
import PageLoader from 'components/PageLoader/PageLoader';
import useApp from 'hooks/app/useApp';
import useLocalStorage from 'use-local-storage';
import { getColorTheme } from './store/slices/userSessionSlice';

function App() {
  // get user session token
  const token = useAppSelector(getToken);

  // gets loading state of our app
  const isLoading = useAppSelector(getIsLoadingApp);

  // req user session data
  useApp();

  // get current theme value from store
  const theme = useAppSelector(getColorTheme);

  console.log(theme);
  return (
    <div data-theme={theme}>
      <PageLoader isVisible={isLoading} fullscreen={true} theme="dark" />
      <BrowserRouter>{token ? <AuthRoutes /> : <PublicRoutes />}</BrowserRouter>
    </div>
  );
}

export default App;
