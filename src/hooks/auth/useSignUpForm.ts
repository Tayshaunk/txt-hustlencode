import { checkUsernameAvailApi } from 'api/account.api';
import { signUpApi } from 'api/auth.api';
import { HncSignupDto } from 'dtos/hustlencode-auth.dto';
import { ISignupServerResponse } from 'interfaces/auth.interface';
import { IPickerItem } from 'interfaces/picker.interface';
import { IServerResponse } from 'interfaces/server.interface';
import { debounce } from 'lodash';
import { ReactElement, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Schema } from 'rsuite';
import { serverErrorHandler } from 'services/server-error.service';
import { useAppDispatch } from 'store/hooks';
import { logout, setToken } from 'store/slices/userSessionSlice';
import { openSuccessToaster } from '../../services/toast.service';

// Extract schema types for form validation
const { StringType, DateType } = Schema.Types;

/**
 * Define validation model for login form.
 * User must provide a valid email and password
 * in order to submit the form.
 *
 * rsuite(5.5.2): https://rsuitejs.com/components/form-validation/
 */
const model = Schema.Model({
  firstName: StringType().isRequired('Please enter your First Name'),
  lastName: StringType().isRequired('Please enter your Last Name'),
  email: StringType()
    .isRequired('Please enter your Personal Email')
    .isEmail('Please Enter a valid email, e.g. johndoe03@email.com'),
  username: StringType().isRequired('Set your username. e.g. john_doe'),
  password: StringType().isRequired('Create a password').minLength(4, 'Password must be 4 characters long.'),
  verifyPassword: StringType()
    .isRequired('Please Re-Enter your Password.')
    .addRule((value, data) => {
      console.log(value);
      if (value !== data.password) {
        return false;
      }
      return true;
    }, 'The two passwords do not match'),
  gender: StringType().isRequired('Choose your gender'),
  organization: StringType().isRequired('Choose organization'),
  birthday: DateType().isRequired('Enter your Birthday'),
});

const INIT_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  verifyPassword: '',
  organization: '',
  birthday: new Date(),
  gender: '',
};



export default function useSignUpForm() {
  const [value, setValue] = useState<HncSignupDto>(INIT_FORM); // set default form values
  const [isLoading, setIsLoading] = useState(false); // flag for submission process
  const [isCheckingUsername, setIsCheckingUsername] = useState(false); // flag for checking username process
  const [isUsernameValid, setIsUsernameValid] = useState(true); // true if username is valid
  const [usernameMessage, setUsernameMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  // get dispatc
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submit = async () => {
    try {
      setIsLoading(true);

      // get user session token
      const token: string = await signUpApi(value);

      // store token
      dispatch(setToken(token))

      //
      setIsLoading(false);

      // redirect to profile page
      navigate('')
    } catch (e) {
      setIsLoading(false);
      serverErrorHandler(e, logoutHandler);
    }
  };

  const onChange = (val: any) => {
    /**
     * check username if:
     * username is not the same as current username
     * username is not empty
     * username is value has changed
     */
    if (val.username.trim() !== '' && value.username !== val.username) {
      setIsCheckingUsername(true);
      debouncedChangeHandler(val.username);
    } else setIsCheckingUsername(false);

    // update form state
    setValue(val);
  };

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


  return {
    value,
    isLoading,
    isCheckingUsername,
    isUsernameValid,
    usernameMessage,
    model,
    submit,
    onChange
  };
}
