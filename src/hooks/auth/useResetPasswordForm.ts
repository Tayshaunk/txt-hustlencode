import { resetPasswordApi } from 'api/auth.api';
import { HncResetPasswordDto } from 'dtos/hustlencode-auth.dto';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Schema } from 'rsuite';
import { serverErrorHandler } from 'services/server-error.service';
import { getFormValidationStatus } from 'util/form.util';
import { openSuccessToaster } from '../../services/toast.service';

// Extract schema types for form validation
const { StringType } = Schema.Types;

/**
 * Define validation model for forgot password form.
 * User must provide a valid email
 *
 * rsuite(5.5.2): https://rsuitejs.com/components/form-validation/
 */
const model = Schema.Model({
  password: StringType()
    .isRequired('Please enter a valid password.')
    .minLength(4, 'Password must be 4 characters long.'),
  passwordConfirm: StringType()
    .isRequired('Please re-enter your password.')
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }
      return true;
    }, 'Passwords do not match.'),
});

const INIT_FORM = { password: '', passwordConfirm: '', userId: '', token: '' };

export default function useResetPasswordForm(id?: string | null, token?: string) {
  const [value, setValue] = useState<HncResetPasswordDto>(INIT_FORM); // set default form values
  const [isLoading, setIsLoading] = useState(false); // flag for submission process

  // get react navigation
  const navigate = useNavigate();

  // set stored login email in form state
  useEffect(() => {
    let mounted = true;

    if (mounted && id && token) setValue({ ...INIT_FORM, userId: id, token: token });

    return () => {
      mounted = false;
    };
  }, [id, token]);

  /**
   * Makes server request to reset password
   */
  const submit = async () => {
    try {
      // verify that form is valid
      if (getFormValidationStatus(model.check(value))) {

        // show spinner
        setIsLoading(true);

        // make server req
        const message: string = await resetPasswordApi(value);

        // opens success message
        openSuccessToaster(message, 50000);

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
