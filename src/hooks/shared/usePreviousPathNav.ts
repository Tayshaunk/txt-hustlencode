import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { getHistory, getPreviousPath } from 'store/slices/userSessionSlice';

/**
 *
 * @returns
 */
export default function usePreviousPathNav() {
  const { pathname } = useLocation();
  // get react router navigate
  const navigate = useNavigate();

  // get previous path
  const prevPath = useAppSelector(getPreviousPath);

  const history = useAppSelector(getHistory);

  const goBack = () => {
    const length = history.length;

    if (length === 1) {
      // go to stored previous path
      navigate(prevPath);
    } else {
      if (history[history.length - 2] === pathname) {
        navigate('/');
      } else {
        navigate(history[history.length - 2]);
      }
    }
  };

  return { goBack };
}
