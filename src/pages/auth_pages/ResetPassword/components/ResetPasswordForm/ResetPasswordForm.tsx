// styles
import classes from './ResetPasswordForm.module.scss';
import { Form, ButtonToolbar } from 'rsuite';
import TextFormField from 'components/FormFields/single/TextFormField';
import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';
import { NavLink } from 'react-router-dom';
import useResetPasswordForm from 'hooks/auth/useResetPasswordForm';

interface IProps {
  token?: string;
  userId?: string | null;
}
const ResetPasswordForm = (props: IProps) => {
  // get reset password form state
  const form = useResetPasswordForm(props.userId, props.token);

  return (
    <div className={classes.ContentWrapper}>
      <h3 className={classes.title}>Forgot your password?</h3>

      <p className={classes.message}>
        Enter your profile email address and we will send you instructions to reset your password.
      </p>
      <p className={classes.warnMessage}>You may have to check your spam or junk folder.</p>

      <Form
        fluid={true}
        className={classes.CustomForm}
        model={form.model}
        formValue={form.value}
        onChange={form.updateForm}
      >
        <TextFormField helpMessage="Minimum 4 characters" type="password" name="password" label={'Password'} />
        <TextFormField type="password" name="passwordConfirm" label={'Confirm Password'} />

        <ButtonToolbar className={classes.FormBtnToolbar}>
          <ButtonSpinner
            type="submit"
            appearance="primary"
            label={'Reset Password'}
            isLoading={form.isLoading}
            disabled={form.isLoading}
            onClick={form.submit}
            containerStyles={{ width: '100%' }}
          />
        </ButtonToolbar>

        <div className={classes.helpLinks}>
          <NavLink to="/">
            <p>Return to login.</p>
          </NavLink>
        </div>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
