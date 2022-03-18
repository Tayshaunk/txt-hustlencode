import { useEffect, useMemo, useState } from 'react';
import { Schema } from 'rsuite';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUser, logout, setUser } from 'store/slices/userSessionSlice';
import { serverErrorHandler } from 'services/server-error.service';
import { getFormValidationStatus } from 'util/form.util';
import debounce from 'lodash.debounce';
import { checkUsernameAvailApi, updateProfileUsernameApi } from 'api/account.api';
import { IServerResponse } from 'interfaces/server.interface';
import { openSuccessToaster } from 'services/toast.service';
import { UpdateHustlencodeProfileUsernameDto } from 'dtos/hustlencode-account.dto';

// Extract schema types for form validation
const { StringType } = Schema.Types;

const INIT_FORM = { username: '', email: '' };

/**
 * Define validation model for updating profile:
 * - username
 * - email
 */
const model = Schema.Model({
  username: StringType().isRequired('Please enter a username.'),
  email: StringType().isRequired('Please enter an email.').isEmail('Please enter a valid email.'),
});

export default function useEditProfileUsername() {
  const [value, setValue] = useState<UpdateHustlencodeProfileUsernameDto>(INIT_FORM); // set default form values
  const [isLoading, setIsLoading] = useState(false); // flag for submission process
  const [isCheckingUsername, setIsCheckingUsername] = useState(false); // flag for checking username process
  const [isUsernameValid, setIsUsernameValid] = useState(true); // true if username is valid
  const [usernameMessage, setUsernameMessage] = useState<string | null>(null);

  // get redux store dispatch
  const dispatch = useAppDispatch();

  // get stored email
  const user = useAppSelector(getUser);

  const logoutHandler = () => dispatch(logout());

  // set user's current email and username
  useEffect(() => {
    let mounted = true;

    if (mounted && user) {
      setValue({ ...INIT_FORM, username: user.username, email: user.email });
    }

    return () => {
      mounted = false;
    };
  }, [user]);

  /**
   * Makes API request to check if the username is
   * available
   * @param val
   */
  const asyncCheckUsername = async (val: string): Promise<void> => {
    if (val.trim() !== '') {
      try {
        // make request to check for username availability
        const response: IServerResponse = await checkUsernameAvailApi(val);
        // hide spinner
        setIsCheckingUsername(false);
        // update username status
        setIsUsernameValid(response.payload);
        setUsernameMessage(response.message);
      } catch (e) {
        setIsCheckingUsername(false);
        serverErrorHandler(e, logoutHandler);
      }
    }
  };

  /**
   * debounce search with 300ms wait time
   * Ignore continous search calls until  timer has
   * elapsed
   */
  const debouncedChangeHandler = useMemo(
    () => debounce(asyncCheckUsername, 300),
    // TODO Resolve 'react-hooks/exhaustive-deps'
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  /**
   * Makes async request to updated the user's
   * username and email.
   */
  const submit = async () => {
    try {
      // verify that form is valid
      if (getFormValidationStatus(model.check(value))) {
        // show spinner
        setIsLoading(true);

        // make api req
        const response: IServerResponse = await updateProfileUsernameApi(value);

        // show success message
        openSuccessToaster(response.message, 3500);

        // hide spinner
        setIsLoading(false);

        // update user sesssion data
        dispatch(setUser(response.payload));
      }
    } catch (e) {
      // hide spinner
      setIsLoading(false);
      serverErrorHandler(e, logoutHandler);
    }
  };

  /**
   * Update the form state when the form field values change
   * The username field is checked to ensure that the provided username is
   * avaiable
   * @param val
   */
  const onChange = (val: UpdateHustlencodeProfileUsernameDto) => {
    /**
     * check username if:
     * username is not the same as current username
     * username is not empty
     * username is value has changed
     */
    if (val.username.trim() !== user?.username && val.username.trim() !== '' && val.username !== value.username) {
      setIsCheckingUsername(true);
      debouncedChangeHandler(val.username);
    } else setIsCheckingUsername(false);

    // check email
    setValue(val);
  };

  return { isCheckingUsername, model, value, isLoading, isUsernameValid, usernameMessage, submit, onChange };
}
