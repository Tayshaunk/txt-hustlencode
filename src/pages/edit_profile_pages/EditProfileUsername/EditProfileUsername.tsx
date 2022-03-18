import { Form, ButtonToolbar } from 'rsuite';
import TextFormField from 'components/FormFields/single/TextFormField';
import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';
import useEditProfileGeneralForm from 'hooks/forms/useEditProfileUsername';
import UsernameFormField from 'components/FormFields/single/UsernameFormField';
import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';

// styles
import classes from './EditProfileUsername.module.scss';

/**
 * Render form where user can update their username
 * @returns
 */
const EditProfileUsername = () => {
  const form = useEditProfileGeneralForm();

  // get current use
  const user = useAppSelector(getUser);

  /**
   * Return message for username status
   * -> return spinner if username is being checked
   * -> return 'username is valid' if username is valid
   * -> return 'username is not valid' if username is taken, or empty, or less than
   * 4 characters
   * -> return empty p element if username has not changed
   *
   * @returns
   */
  const renderUsernameMessage = (): ReactElement<any> => {
    // check if username value is different from current user name
    if (form.value.username !== user?.username && form.value.username.trim() !== '') {
      // return spinner if we are checking username
      if (form.isCheckingUsername) {
        return <FontAwesomeIcon className={classes.usernameSpinner} icon={faSpinner} spin />;
      }else{
        return <p className={form.isUsernameValid ? classes.validUsername:classes.invalidUsername}>{form.usernameMessage}</p>
      }
    }

    return <p/>
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
            disabled={form.isCheckingUsername || !form.isUsernameValid}
            onClick={form.submit}
            size="md"
            className={classes.saveBtn}
          />
        </ButtonToolbar>
      </Form>
    </div>
  );
};

export default EditProfileUsername;
