import { useEffect, useState } from 'react';
import { serverErrorHandler } from 'services/server-error.service';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUser, logout } from 'store/slices/userSessionSlice';
import { ICode, IHustlencodePost } from 'interfaces/post.interface';
import { updatePostApi } from 'api/post.api';
import { CreateHustlencodePostDto, UpdateHustlencodePostDto } from 'dtos/hustlencode-post.dto';
import { IServerResponse } from 'interfaces/server.interface';
import { openSuccessToaster } from 'services/toast.service';
import { useNavigate, useLocation } from 'react-router-dom';

const CODE_INIT = {
  html: '',
  css: '',
  js: '',
  linesOfCode: 0,
};

export default function usePostPreview(
  post: CreateHustlencodePostDto | UpdateHustlencodePostDto | null,
  setPost: (p: CreateHustlencodePostDto | UpdateHustlencodePostDto) => void,
) {
  const location = useLocation();

  // setup localstorage keys using the current location
  const htmlChangesKey = location.pathname.replace('/', '') + 'html';
  const cssChangesKey = location.pathname.replace('/', '') + 'css';
  const jsChangesKey = location.pathname.replace('/', '') + 'js';

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [value, setValue] = useState<ICode>(CODE_INIT);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [showUnsavedChanges, setShowUnsavedChanges] = useState<boolean>(false);

  // get react router navigate
  const navigate = useNavigate();

  // redux dispatcher
  const dispatch = useAppDispatch();

  // clears user session data and logs user out
  const logoutHandler = () => dispatch(logout());

  // get user session data
  const user = useAppSelector(getUser);

  useEffect(() => {
    let mounted = true;

    if (mounted && post && user) {
      // show unsaved changes modal
      if (localStorage[htmlChangesKey] || localStorage[cssChangesKey] || localStorage[jsChangesKey]) {
        setShowUnsavedChanges(true);
      }

      setValue({
        html: post.html,
        css: post.css,
        js: post.js,
        linesOfCode: post.linesOfCode,
      });

      setIsLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [post, user]);

  const saveChanges = async (postId: string, payload: UpdateHustlencodePostDto) => {
    try {
      setIsSaving(true);

      // request user post payload
      const response: IServerResponse = await updatePostApi(postId, payload);

      // update state
      openSuccessToaster(response.message, 3000);

      // hide loader
      setIsSaving(false);

      // update post values
      setPost(response.payload);

      // clear unsaved changes
      clearStorage();

      setHasChanges(false);
    } catch (e) {
      setIsSaving(false);
      serverErrorHandler(e, logoutHandler);
    }
  };

  const saveAndExit = async (postId: string, payload: UpdateHustlencodePostDto) => {
    try {
      setIsSaving(true);

      // request user post payload
      const response: IServerResponse = await updatePostApi(postId, payload);

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

  const clearStorage = () => {
    localStorage.removeItem(htmlChangesKey);
    localStorage.removeItem(cssChangesKey);
    localStorage.removeItem(jsChangesKey);
  };

  const closeModal = () => {
    setShowUnsavedChanges(false);
  };

  const applyUnsavedChanges = () => {
    if (post) {
      const updatedPost: CreateHustlencodePostDto | UpdateHustlencodePostDto = { ...post };

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

      setPost({ ...updatedPost });
      clearStorage();
      closeModal();
    }
  };

  const discardChanges = () => {
    clearStorage();
    closeModal();
  };

  return {
    value,
    isLoading,
    isSaving,
    hasChanges,
    showUnsavedChanges,
    setHasChanges,
    setValue,
    saveChanges,
    saveAndExit,
    closeModal,
    applyUnsavedChanges,
    discardChanges,
  };
}
