import { useState } from 'react';
import { Schema } from 'rsuite';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/slices/userSessionSlice';
import { serverErrorHandler } from 'services/server-error.service';
import { getFormValidationStatus } from 'util/form.util';
import { IServerResponse } from 'interfaces/server.interface';
import { openSuccessToaster } from 'services/toast.service';
import { UpdateHustlencodeProfilePasswordDto } from 'dtos/hustlencode-account.dto';
import { updateProfilePasswordApi } from 'api/account.api';
// Extract schema types for form validation
const { StringType } = Schema.Types;

const INIT_FORM = { password: '', currentPassword: '' };

/**
 * Define validation model for updating profile:
 * - password
 */
const model = Schema.Model({
  currentPassword: StringType().isRequired('Please enter your current password.'),
  password: StringType()
    .isRequired('Please enter a valid password.')
    .minLength(4, 'Password must be 4 characters long.'),
});

export default function useEditProfilePasswordForm() {
  const [value, setValue] = useState<UpdateHustlencodeProfilePasswordDto>(INIT_FORM); // set default form values
  const [isLoading, setIsLoading] = useState(false); // flag for submission process

  // get redux store dispatch
  const dispatch = useAppDispatch();

  const logoutHandler = () => dispatch(logout());

  /**
   * Makes async request to update the user's password
   */
  const submit = async () => {
    try {
      // verify that form is valid
      if (getFormValidationStatus(model.check(value))) {
        // show spinner
        setIsLoading(true);

        // make api req
        const response: IServerResponse = await updateProfilePasswordApi(value);

        // show success message
        openSuccessToaster(response.message, 3500);

        // hide spinner
        setIsLoading(false);

        // clear form
        setValue(INIT_FORM);
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
  const onChange = (val: UpdateHustlencodeProfilePasswordDto) => {
    // check email
    setValue(val);
  };

  return { model, value, isLoading, submit, onChange };
}
