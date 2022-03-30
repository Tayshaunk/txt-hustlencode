import { useEffect, useState } from 'react';
import { Schema } from 'rsuite';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUser, logout, setUser } from 'store/slices/userSessionSlice';
import { serverErrorHandler } from 'services/server-error.service';
import { getFormValidationStatus } from 'util/form.util';
import { IServerResponse } from 'interfaces/server.interface';
import { openSuccessToaster } from 'services/toast.service';
import { UpdateHustlencodeProfileGeneralDto } from 'dtos/hustlencode-account.dto';
import { updateProfileGeneralApi } from 'api/account.api';
// Extract schema types for form validation
const { StringType } = Schema.Types;

const INIT_FORM = { firstName: '', lastName: '' };

/**
 * Define validation model for updating profile:
 * - name
 */
const model = Schema.Model({
  firstName: StringType().isRequired('Please enter your first name.'),
  lastName: StringType().isRequired('Please enter your last name.'),
});

export default function useEditProfileGeneral() {
  const [value, setValue] = useState<UpdateHustlencodeProfileGeneralDto>(INIT_FORM); // set default form values
  const [isLoading, setIsLoading] = useState(false); // flag for submission process

  // get redux store dispatch
  const dispatch = useAppDispatch();

  // get stored email
  const user = useAppSelector(getUser);

  // clear user session
  const logoutHandler = () => dispatch(logout());

  // set user's current name
  useEffect(() => {
    let mounted = true;

    if (mounted && user) {
      setValue({ ...INIT_FORM, firstName: user.firstName, lastName: user.lastName });
    }

    return () => {
      mounted = false;
    };
  }, [user]);

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
        const response: IServerResponse = await updateProfileGeneralApi(value);

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
  const onChange = (val: UpdateHustlencodeProfileGeneralDto) => {
    // check email
    setValue(val);
  };

  return { model, value, isLoading, submit, onChange };
}
