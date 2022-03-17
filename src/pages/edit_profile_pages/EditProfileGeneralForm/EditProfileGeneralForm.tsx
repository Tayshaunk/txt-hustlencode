import { Form, ButtonToolbar } from 'rsuite';
import TextFormField from 'components/FormFields/single/TextFormField';
import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';
import useEditProfileGeneralForm from 'hooks/forms/useEditProfileGeneralForm';

// styles
import classes from './EditProfileGeneralForm.module.scss';
import UsernameFormField from 'components/FormFields/single/UsernameFormField';
import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from 'lodash';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';

/**
 * Render form where user can update their username
 * @returns
 */
const EditProfileGeneralForm = () => {
  const form = useEditProfileGeneralForm();

  // get current use
  const user = useAppSelector(getUser);

  const renderUsernameMessage = (): ReactElement<any> => {
    if (form.value.username !== user?.username) {
      console.log(form.isCheckingUsername);
      if (form.isCheckingUsername) {
        return <FontAwesomeIcon icon={faSpinner} spin />;
      }

      if (!form.isCheckingUsername && form.isUsernameValid) {
        return <p style={{ color: 'green' }}>Username is valid.</p>;
      }

      if (
        !form.isCheckingUsername &&
        !form.isUsernameValid &&
        !isEmpty(form.value.username) &&
        form.value.username !== user?.username
      ) {
        return <p style={{ color: 'green' }}>Username is not valid.</p>;
      }
    }

    return <p />;
  };
  return (
    <div className={classes.ContentWrapper}>
      <Form
        formValue={form.value}
        fluid={true}
        className={classes.CustomForm}
        model={form.model}
        onChange={(val: any) => form.onChange(val)}
      >
        <UsernameFormField
          renderMessage={renderUsernameMessage}
          checkAsync={true}
          type="text"
          name="username"
          label={'Username'}
          placeholder="Example username: firstName_lastName"
        />

        <TextFormField type="text" name="email" label={'Email'} />

        <ButtonToolbar className={classes.FormBtnToolbar}>
          <ButtonSpinner
            type="submit"
            appearance="primary"
            label={'Save Changes'}
            isLoading={form.isLoading}
            disabled={form.isLoading}
            onClick={form.submit}
            size="md"
            className={classes.saveBtn}
          />
        </ButtonToolbar>
      </Form>
    </div>
  );
};

export default EditProfileGeneralForm;
