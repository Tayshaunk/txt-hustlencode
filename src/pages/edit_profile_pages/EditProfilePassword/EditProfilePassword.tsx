import { Form, ButtonToolbar } from 'rsuite';
import TextFormField from 'components/FormFields/single/TextFormField';
import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';

// styles
import classes from './EditProfilePassword.module.scss';
import useEditProfilePasswordForm from 'hooks/forms/useEditProfilePasswordForm';


/**
 * Render form where user can update their password
 * @returns
 */
const EditProfilePassword = () => {
  // get form
  const form = useEditProfilePasswordForm();

  return (
    <div className={classes.ContentWrapper}>
      <Form
        formValue={form.value}
        fluid={true}
        className={classes.CustomForm}
        model={form.model}
        onChange={(val: any) => form.onChange(val)}
      >
        <TextFormField type="password" name="currentPassword" label={'Current password'} />

        <TextFormField type="password" name="password" label={'New Password'} />

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

export default EditProfilePassword;
