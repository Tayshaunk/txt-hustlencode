import { useEffect, useMemo, useState } from 'react';
import { Schema } from 'rsuite';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUser, logout } from 'store/slices/userSessionSlice';
import { serverErrorHandler } from 'services/server-error.service';
import { getFormValidationStatus } from 'util/form.util';
import { UpdateHustlencodeProfileGeneral } from 'dtos/hustlencode-profile.dto';
import debounce from 'lodash.debounce';
// Extract schema types for form validation
const { StringType } = Schema.Types;

const usernameErrorMessage = 'Username is already taken.';

const INIT_FORM = { username: '', email: '' };

/**
 * Define validation model for profile general form
 * Users must provide a username and email that is
 * valid in order to submit
 */
const model = Schema.Model({
  username: StringType().isRequired('Please enter a username.'),
  email: StringType().isRequired('Please enter an email.').isEmail('Please enter a valid email.'),
});

export default function useEditProfileGeneralForm() {
  const [value, setValue] = useState<UpdateHustlencodeProfileGeneral>(INIT_FORM); // set default form values
  const [isLoading, setIsLoading] = useState(false); // flag for submission process
  const [isCheckingUsername, setIsCheckingUsername] = useState(false); // flag for checking username process
  const [isUsernameValid, setIsUsernameValid] = useState(true); // true if username is valid
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);

  // get redux store dispatch
  const dispatch = useAppDispatch();

  // get stored email
  const user = useAppSelector(getUser);

  const logoutHandler = () => dispatch(logout());

  // set user's current email and username
  useEffect(() => {
    let mounted = true;

    if (mounted && user) {
      console.log('set value');
      setValue({ ...INIT_FORM, username: user.username, email: user.email });
    }

    return () => {
      mounted = false;
    };
  }, [user]);

  const asyncCheckUsername = (val: UpdateHustlencodeProfileGeneral): any => {
    console.log(val);
    setIsCheckingUsername(false);
    setIsUsernameValid(true);
  };

  /**
   * debounce search with 300ms wait time
   * Ignore continous search calls until  timer has
   * elapsed
   *
   */
  const debouncedChangeHandler = useMemo(
    () => debounce(asyncCheckUsername, 300),
    // TODO Resolve 'react-hooks/exhaustive-deps'
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const submit = async () => {
    try {
      // verify that form is valid
      if (getFormValidationStatus(model.check(value))) {
        // show spinner
        setIsLoading(true);

        //const response: IServerResponse = await updateProfileGeneralApi(value);

        // show success message
        //openSuccessToaster(response.payload, 3500);

        // hide spinner
        setIsLoading(false);

        //dispatch(setUser(response.payload));
      }
    } catch (e) {
      // hide spinner
      setIsLoading(false);
      serverErrorHandler(e, logoutHandler);
    }
  };

  const onChange = (val: UpdateHustlencodeProfileGeneral) => {
    // check username
    if (val.username.trim() !== value.username) {
      setIsCheckingUsername(true);
      debouncedChangeHandler(val);
    }

    // check email
    setValue(val);
  };

  return { isCheckingUsername, usernameErrorMessage, model, value, isLoading, isUsernameValid, submit, onChange };
}
