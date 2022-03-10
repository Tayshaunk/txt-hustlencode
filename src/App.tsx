import { BrowserRouter } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { getIsLoadingApp, getToken } from 'store/slices/userSessionSlice';
import PublicRoutes from 'routing/routes/index.routes';
import AuthRoutes from 'routing/routes/auth.routes';
import PageLoader from 'components/PageLoader/PageLoader';
import useApp from 'hooks/useApp';

function App() {
  // get user session token
  const token = useAppSelector(getToken);

  // gets loading state of our app
  const isLoading = useAppSelector(getIsLoadingApp);

  useApp();

  return (
    <div>
      <PageLoader isVisible={isLoading} fullscreen={true} theme="dark" />
      <BrowserRouter>{token ? <AuthRoutes /> : <PublicRoutes />}</BrowserRouter>
    </div>
  );
}

export default App;
