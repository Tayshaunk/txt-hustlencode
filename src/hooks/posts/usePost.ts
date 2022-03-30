import { useEffect, useState } from 'react';
import { serverErrorHandler } from 'services/server-error.service';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUser, logout } from 'store/slices/userSessionSlice';
import { IHustlencodePost } from 'interfaces/post.interface';
import { getPostApi } from 'api/post.api';

export default function usePost(id: string | undefined) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<IHustlencodePost | null>(null);

  // redux dispatcher
  const dispatch = useAppDispatch();

  // clears user session data and logs user out
  const logoutHandler = () => dispatch(logout());

  // get user session data
  const user = useAppSelector(getUser);

  useEffect(
    () => {
      let mounted = true;

      /**
       * Makes async request for post details
       * @param id - post _id
       */
      async function loadDataAsync(id: string) {
        try {
          // request user post payload
          const response = await getPostApi(id);
          // update state
          setValue(response);
          // hide loader
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          serverErrorHandler(e, logoutHandler);
        }
      }

      if (mounted && user && id) loadDataAsync(id);

      return () => {
        mounted = false;
      };
    },
    // TODO: Resolve 'react-hooks/exhaustive-deps'
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, user],
  );

  return {
    value,
    isLoading,
    setValue,
  };
}
