import { useEffect, useState } from 'react';
import { serverErrorHandler } from 'services/server-error.service';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/slices/userSessionSlice';
import { ICode } from 'interfaces/post.interface';
import { createPostApi } from 'api/post.api';
import { CreateHustlencodePostDto } from 'dtos/hustlencode-post.dto';
import { useLocation, useNavigate } from 'react-router-dom';
import { IServerResponse } from 'interfaces/server.interface';
import { openSuccessToaster } from 'services/toast.service';

const POST_INIT = {
  html: '',
  css: '',
  js: '',
  linesOfCode: 0,
};

export default function useCreatePost(id: string | undefined) {
  const navigate = useNavigate();
  const location = useLocation();

  // setup localstorage keys using the current location
  const htmlChangesKey = location.pathname.replace('/', '') + 'html';
  const cssChangesKey = location.pathname.replace('/', '') + 'css';
  const jsChangesKey = location.pathname.replace('/', '') + 'js';

  // tracks if the post content is being updated
  const [isSaving, setIsSaving] = useState<boolean>(false);
  // content for post
  const [value, setValue] = useState<ICode>(POST_INIT);
  // determines if modal for unsaved changes is hidden or shown
  const [showUnsavedChanges, setShowUnsavedChanges] = useState<boolean>(false);
  // tracks if the editors contain updated code
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // redux dispatcher
  const dispatch = useAppDispatch();

  // clears user session data and logs user out
  const logoutHandler = () => dispatch(logout());

  /**
   * Check if there are any unsaved changes
   */
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (localStorage[htmlChangesKey] || localStorage[cssChangesKey] || localStorage[jsChangesKey]) {
        setShowUnsavedChanges(true);
      }
    }

    return () => {
      mounted = false;
    };
  }, [htmlChangesKey, cssChangesKey, jsChangesKey]);

  /**
   * Makes request to make post
   * @param payload The post data
   */
  const saveChanges = async (payload: CreateHustlencodePostDto) => {
    try {
      setIsSaving(true);

      // make request to update post
      const response: IServerResponse = await createPostApi(payload);

      // show success message
      openSuccessToaster(response.message, 3000);

      // hide loader
      setIsSaving(false);

      // clear unsaved changes
      clearStorage();
      setHasChanges(false);

      navigate('/');
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
  const saveAndExit = async (payload: CreateHustlencodePostDto) => {
    try {
      setIsSaving(true);

      // request user post payload
      const response: IServerResponse = await createPostApi(payload);

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
    const updatedPost: ICode = {
      html: '',
      css: '',
      js: '',
      linesOfCode: 0,
    };

    // apply html changes
    if (localStorage[htmlChangesKey]) {
      updatedPost.html = localStorage[htmlChangesKey];
    }
    // apply css changes
    if (localStorage[cssChangesKey]) {
      updatedPost.css = localStorage[cssChangesKey];
    }
    // apply js changes
    if (localStorage[jsChangesKey]) {
      updatedPost.js = localStorage[jsChangesKey];
    }

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
