import { useEffect, useState } from 'react';
import { serverErrorHandler } from 'services/server-error.service';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUser, logout } from 'store/slices/userSessionSlice';
import { ICode } from 'interfaces/post.interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { IServerResponse } from 'interfaces/server.interface';
import { openSuccessToaster } from 'services/toast.service';
import { getProfileAboutApi, updateProfileAboutApi } from 'api/profile.api';
import { UpdateHustlencodeProfileAboutDto } from 'dtos/hustlencode-profile.dto';

const POST_INIT = {
  html: '',
  css: '',
  js: '',
  linesOfCode: 0,
};

/**
 * @returns
 */
export default function useUpdateProfileAbout() {
  const navigate = useNavigate();
  const location = useLocation();

  // setup localstorage keys using the current location
  const htmlChangesKey = location.pathname.replace('/', '') + 'html';
  const cssChangesKey = location.pathname.replace('/', '') + 'css';
  const jsChangesKey = location.pathname.replace('/', '') + 'js';

  // tracks if request for post details has finished
  const [isDoneLoading, setIsDoneLoading] = useState<boolean>(false);
  // tracks if the post content is being updated
  const [isSaving, setIsSaving] = useState<boolean>(false);
  // content for post
  const [value, setValue] = useState<ICode | null>(POST_INIT);
  // determines if modal for unsaved changes is hidden or shown
  const [showUnsavedChanges, setShowUnsavedChanges] = useState<boolean>(false);
  // tracks if the editors contain updated code
  const [hasChanges, setHasChanges] = useState<boolean>(false);

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
        const data = await getProfileAboutApi(username);

        // handle unsaved changes
        if (localStorage[htmlChangesKey] || localStorage[cssChangesKey] || localStorage[jsChangesKey]) {
          setShowUnsavedChanges(true);
        }

        // store the retrieved code
        setValue(data);
        // hide page loader
        setIsDoneLoading(true);
      } catch (e) {
        setIsDoneLoading(true);
        serverErrorHandler(e, logoutHandler);
      }
    }

    if (mounted && user) asyncLoadData(user.username);

    return () => {
      mounted = false;
    };
    // TODO Resolve 'react-hooks/exhaustive-deps'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /**
   * Makes request to make post
   * @param payload The post data
   */
  const saveChanges = async (payload: UpdateHustlencodeProfileAboutDto) => {
    try {
      setIsSaving(true);

      // make request to update post
      const response: IServerResponse = await updateProfileAboutApi(user?._id || '', payload);

      // show success message
      openSuccessToaster(response.message, 3000);

      // hide loader
      setIsSaving(false);

      // clear unsaved changes
      clearStorage();
      setHasChanges(false);
    } catch (e) {
      setIsSaving(false);
      serverErrorHandler(e, logoutHandler);
    }
  };

  /**
   * Makes request create post and redirects user to
   * profile page
   * @param postId The post _id
   * @param payload The post updates
   */
  const saveAndExit = async (payload: UpdateHustlencodeProfileAboutDto) => {
    try {
      setIsSaving(true);

      // request user post payload
      const response: IServerResponse = await updateProfileAboutApi(user?._id || '', payload);

      // update state
      openSuccessToaster(response.message, 3000);

      // hide loader
      setIsSaving(false);

      // clear unsaved changes
      clearStorage();

      navigate('/');
    } catch (e) {
      setIsSaving(false);
      serverErrorHandler(e, logoutHandler);
    }
  };

  /**
   * Removes unsaved changes from local storage
   */
  const clearStorage = () => {
    console.log('clearing storage');
    localStorage.removeItem(htmlChangesKey);
    localStorage.removeItem(cssChangesKey);
    localStorage.removeItem(jsChangesKey);
  };

  /**
   * Hides modal for restoring unsaved changes
   */
  const closeModal = () => {
    setShowUnsavedChanges(false);
  };

  /**
   * Restores unsaved code
   */
  const applyUnsavedChanges = () => {
    console.log(value);
    const updatedPost: ICode = {
      html: '',
      css: '',
      js: '',
      linesOfCode: 0,
    };

    // apply html changes
    if (localStorage[htmlChangesKey] && localStorage[htmlChangesKey] !== '') {
      updatedPost.html = localStorage[htmlChangesKey];
    } else updatedPost.html = value?.html || '';

    // apply css changes
    if (localStorage[cssChangesKey]) {
      updatedPost.css = localStorage[cssChangesKey];
    } else updatedPost.css = value?.css || '';

    // apply js changes
    if (localStorage[jsChangesKey]) {
      updatedPost.js = localStorage[jsChangesKey];
    } else updatedPost.js = value?.js || '';

    // update post value
    setValue({ ...updatedPost });

    // clear unsaved changes and hide modal
    discardChanges();
  };

  /**
   * Removes unsaved changes from local storage
   */
  const discardChanges = () => {
    clearStorage();
    closeModal();
  };

  return {
    value,
    showUnsavedChanges,
    hasChanges,
    isSaving,
    isDoneLoading,
    setHasChanges,
    setIsSaving,
    setValue,
    saveChanges,
    applyUnsavedChanges,
    discardChanges,
    closeModal,
    saveAndExit,
  };
}
