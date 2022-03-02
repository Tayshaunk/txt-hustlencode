import { useEffect, useState } from 'react';
import { getProfileApi } from 'api/profile.api';
import { IHustlencodeUser } from 'interfaces/user.interface';
import { serverErrorHandler } from 'services/server-error.service';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/slices/userSessionSlice';

export default function useProfile(username?: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<IHustlencodeUser>();

  // redux dispatcher
  const dispatch = useAppDispatch();

  // clears user session data and logs user out
  const logoutHandler = () => dispatch(logout());

  useEffect(() => {
    let mounted = true;

    /**
     * Makes async request for user profile info
     * Profile is stored in state
     * @param username 
     */
    async function loadDataAsync(username: string) {
      try {
        // request user profile
        const response: IHustlencodeUser = await getProfileApi(username);
        // update state
        setValue(response);
        // hide loader
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        serverErrorHandler(e, logoutHandler);
      }
    }

    if (mounted && username) loadDataAsync(username);

    return () => {
      mounted = false;
    };
  }, [username]);

  return {
    value,
    isLoading
  };
}
