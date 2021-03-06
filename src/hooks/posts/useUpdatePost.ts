import { useEffect, useState } from 'react';
import { serverErrorHandler } from 'services/server-error.service';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/slices/userSessionSlice';
import { ICode, IHustlencodePost } from 'interfaces/post.interface';
import { updatePostApi } from 'api/post.api';
import { UpdateHustlencodePostDto } from 'dtos/hustlencode-post.dto';
import usePost from './usePost';
import { useLocation } from 'react-router-dom';
import { IServerResponse } from 'interfaces/server.interface';
import { openSuccessToaster } from 'services/toast.service';

export interface IPostUser {
  name: string;
}
export default function useUpdatePost(id?: string) {
  const location = useLocation();

  // setup localstorage keys using the current location
  const htmlChangesKey = location.pathname.replace('/', '') + 'html';
  const cssChangesKey = location.pathname.replace('/', '') + 'css';
  const jsChangesKey = location.pathname.replace('/', '') + 'js';

  // tracks if request for post details has finished
  const [isDoneLoading, setIsDoneLoading] = useState<boolean>(false);
  // post updates
  const [value, setValue] = useState<ICode | null>(null);
  // tracks if the editors contain updated code
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  // determines if modal for unsaved changes is hidden or shown
  const [showUnsavedChanges, setShowUnsavedChanges] = useState<boolean>(false);
  // tracks if the post content is being updated
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // redux dispatcher
  const dispatch = useAppDispatch();

  // clears user session data and logs user out
  const logoutHandler = () => dispatch(logout());

  // gets the post details
  const post = usePost(id);

  const postData = post.value;

  useEffect(
    () => {
      let mounted = true;

      if (mounted && postData) {
        if (localStorage[htmlChangesKey] || localStorage[cssChangesKey] || localStorage[jsChangesKey]) {
          setShowUnsavedChanges(true);
        }

        const map = {
          html: postData.html || '',
          css: postData.css || '',
          js: postData.js || '',
          linesOfCode: postData.linesOfCode || 0,
        };

        setValue(map);
        setIsDoneLoading(true);
      }

      return () => {
        mounted = false;
      };
    },
    // TODO Resolve 'react-hooks/exhaustive-deps'
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [postData],
  );

  /**
   * Makes request to save post changes.

   * @param payload The post updates
   */
  const saveChanges = async (payload: UpdateHustlencodePostDto) => {
    try {
      setIsSaving(true);

      // make request to update post
      const response: IServerResponse = await updatePostApi(post.value?._id || '', payload);

      // show success message
      openSuccessToaster(response.message, 3000);

      // hide loader
      setIsSaving(false);

      // update post values
      post.setValue(response.payload);

      // clear unsaved changes
      clearStorage();
      setHasChanges(false);
    } catch (e) {
      setIsSaving(false);
      serverErrorHandler(e, logoutHandler);
    }
  };

  /**
   * Makes request to save post changes and redirects user to
   * profile page
   * @param postId The post _id
   * @param payload The post updates
   */
  const saveAndExit = async (payload: UpdateHustlencodePostDto) => {
    try {
      setIsSaving(true);

      // request user post payload
      const response: IServerResponse = await updatePostApi(post.value?._id || '', payload);

      // update state
      openSuccessToaster(response.message, 3000);

      // hide loader
      setIsSaving(false);

      // clear unsaved changes
      clearStorage();
    } catch (e) {
      setIsSaving(false);
      serverErrorHandler(e, logoutHandler);
    }
  };

  /**
   * Removes unsaved changes from local storage
   */
  const clearStorage = () => {
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
    // only apply saved changes if post data exists
    if (post.value) {
      const updatedPost: IHustlencodePost = { ...post.value };

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
      post.setValue({ ...updatedPost });

      // clear unsaved changes and hide modal
      discardChanges();
    }
  };

  /**
   * Removes unsaved changes from local storage
   */
  const discardChanges = () => {
    clearStorage();
    closeModal();
  };

  return {
    post,
    value,
    isDoneLoading,
    hasChanges,
    showUnsavedChanges,
    isSaving,
    setValue,
    discardChanges,
    closeModal,
    setHasChanges,
    saveChanges,
    saveAndExit,
    applyUnsavedChanges,
  };
}
