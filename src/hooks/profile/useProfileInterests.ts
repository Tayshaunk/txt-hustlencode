import { useEffect, useState } from 'react';
import { getProfileInterestsApi } from 'api/profile.api';
import { serverErrorHandler } from 'services/server-error.service';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUser, logout } from 'store/slices/userSessionSlice';
import { ICode } from 'interfaces/post.interface';

const POST_INIT = {
  html: '',
  css: '',
  js: '',
  linesOfCode: 0,
};

export default function useProfileInterests(username?: string) {
  // tracks if request for post details has finished
  const [isDoneLoading, setIsDoneLoading] = useState<boolean>(false);
  // content for post
  const [value, setValue] = useState<ICode | null>(POST_INIT);

  // redux dispatcher
  const dispatch = useAppDispatch();

  // clears user session data and logs user out
  const logoutHandler = () => dispatch(logout());

  // get user session data
  const user = useAppSelector(getUser);

  useEffect(() => {
    let mounted = true;

    /**
     * Make async request for
     * for profile about code
     * @param username
     */
    async function asyncLoadData(username: string) {
      try {
        // get code for about module
        const data = await getProfileInterestsApi(username);

        if (mounted) {
          // store the retrieved code
          setValue(data);
          // hide page loader
          setIsDoneLoading(true);
        }
      } catch (e) {
        setIsDoneLoading(true);
        serverErrorHandler(e, logoutHandler);
      }
    }

    if (mounted && user && username) asyncLoadData(username);

    return () => {
      mounted = false;
    };
    // TODO Resolve 'react-hooks/exhaustive-deps'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, username]);

  return {
    value,
    isDoneLoading,
  };
}
