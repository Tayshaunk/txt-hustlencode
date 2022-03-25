import { forgotPasswordApi } from 'api/auth.api';
import { HncForgotPasswordDto } from 'dtos/hustlencode-auth.dto';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Schema } from 'rsuite';
import { serverErrorHandler } from 'services/server-error.service';
import { openInfoToaster } from 'services/toast.service';
import { useAppSelector } from 'store/hooks';
import { getEmail } from 'store/slices/userSessionSlice';
import { getFormValidationStatus } from 'util/form.util';

// Extract schema types for form validation
const { StringType } = Schema.Types;

/**
 * Define validation model for forgot password form.
 * User must provide a valid email
 *
 * rsuite(5.5.2): https://rsuitejs.com/components/form-validation/
 */
const model = Schema.Model({
  email: StringType().isRequired('Please enter a valid email.').isEmail('Please enter a valid email.'),
});

const INIT_FORM = { email: '' };

export default function useForgotPasswordForm() {
  const [value, setValue] = useState<HncForgotPasswordDto>(INIT_FORM); // set default form values
  const [isLoading, setIsLoading] = useState(false); // flag for submission process

  // get react navigation
  const navigate = useNavigate();

  // get stored email
  const storedEmail = useAppSelector(getEmail);

  // set stored login email in form state
  useEffect(() => {
    let mounted = true;

    if (mounted && storedEmail) setValue({ ...INIT_FORM });

    return () => {
      mounted = false;
    };
  }, [storedEmail]);

  /**
   * Makes server request to validate user credentials.
   * Users with valid credentials are authenticated and
   * redirect to the authenticated routes
   */
  const submit = async () => {
    try {
      // verify that form is valid
      if (getFormValidationStatus(model.check(value))) {
        console.log(value);
        // show spinner
        setIsLoading(true);

        /**
         * Makes server request for instructions to reset
         * profile password. If the email provided is tied to a profile,
         * the instructions will be sent via email,=.
         **/
        const message: string = await forgotPasswordApi(value);

        // opens success message
        openInfoToaster(message, 50000);

        // hide spinner
        setIsLoading(false);

        // go back to login
        navigate('/');
      }
    } catch (e) {
      // hide spinner
      setIsLoading(false);
      serverErrorHandler(e, () => {});
    }
  };

  const updateForm = (val: any) => {
    setValue(val);
  };

  return { model, value, isLoading, submit, updateForm };
}
