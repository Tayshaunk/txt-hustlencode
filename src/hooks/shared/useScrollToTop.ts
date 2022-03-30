import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { pushHistory } from 'store/slices/userSessionSlice';

/**
 * Hook scrolls to top of page on path change.
 * @returns
 */
export default function useScrollToTop() {
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  // call the auto scroll on pathname change
  useEffect(
    () => {
      window.scrollTo(0, 0);
      dispatch(pushHistory(pathname));
    },
    // TODO Resolve 'react-hooks/exhaustive-deps'
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname],
  );

  return {};
}
