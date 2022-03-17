import { useEffect, useState } from 'react';
import { serverErrorHandler } from 'services/server-error.service';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUser, logout } from 'store/slices/userSessionSlice';
import { IHustlencodePost } from 'interfaces/post.interface';
import { getExplorePostsApi } from 'api/post.api';

export default function useExplore() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [postCount, setPostCount] = useState<number>(0);
  const [value, setValue] = useState<IHustlencodePost[]>([]);

  // redux dispatcher
  const dispatch = useAppDispatch();

  // clears user session data and logs user out
  const logoutHandler = () => dispatch(logout());

  // get current user
  const user = useAppSelector(getUser);

  useEffect(() => {
    let mounted = true;

    /**
     * Makes async request for user explore posts
     */
    async function loadDataAsync() {
      try {
        // request user explore post payload
        const response = await getExplorePostsApi(10);

        if (mounted) {
          // update state
          setValue(response.posts);
          setPostCount(response.postCount);
          // hide loader
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        serverErrorHandler(e, logoutHandler);
      }
    }

    if (mounted && user) loadDataAsync();

    return () => {
      mounted = false;
    };
    // TODO: Resolve 'react-hooks/exhaustive-deps'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /**
   * Makes request for more profile posts
   * 10 more posts are requested
   */
  async function pullMorePosts() {
    try {
      setIsPulling(true);
      // request user post payload
      const response = await getExplorePostsApi(value.length + 10);
      // update state
      setValue(response.posts);
      setPostCount(response.postCount);
      // hide loader
      setIsPulling(false);
    } catch (e) {
      setIsPulling(false);
      serverErrorHandler(e, logoutHandler);
    }
  }

  /**
   * Removes post from post feed
   * @param id: Id of post to remove
   */
  function removePost(id: string) {
    setValue([...value.filter(p => p._id !== id)]);
    setPostCount(postCount - 1);
  }

  return {
    value,
    postCount,
    isLoading,
    isPulling,
    pullMorePosts,
    removePost,
  };
}
