import { useEffect, useState } from 'react';
import { serverErrorHandler } from 'services/server-error.service';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/slices/userSessionSlice';
import { IHustlencodePost } from 'interfaces/post.interface';
import { getProfilePostsApi } from 'api/post.api';

/**
 * Handles the post feed state. This hook will
 * make a async request for the user's 10 most recent
 * posts.
 * @param id - user's _id
 * @returns
 * - value: The list of user posts
 * - postCount: The total count of user posts. Determins if user can fetch more
 * - isLoading: Keeps track if the async request is in progress
 * - isPulling: Keeps track if the async request for more posts is in progress
 * - pullMorePosts: Method that pulls more posts
 */
export default function usePosts(id: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [postCount, setPostCount] = useState<number>(0);
  const [value, setValue] = useState<IHustlencodePost[]>([]);

  // redux dispatcher
  const dispatch = useAppDispatch();

  // clears user session data and logs user out
  const logoutHandler = () => dispatch(logout());

  useEffect(() => {
    let mounted = true;

    /**
     * Makes async request for user posts
     * @param id - user's _id
     */
    async function loadDataAsync(id: string) {
      try {
        // request user post payload
        const response = await getProfilePostsApi(id, 10);

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

    if (mounted && id) loadDataAsync(id);

    return () => {
      mounted = false;
    };
  // TODO: Resolve 'react-hooks/exhaustive-deps'
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /**
   * Makes request for more profile posts
   * 10 more posts are requested
   */
  async function pullMorePosts() {
    try {
      setIsPulling(true);
      // request user post payload
      const response = await getProfilePostsApi(id, value.length + 10);
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
