// styles
import classes from './ForgotPasswordForm.module.scss';
import { Form, ButtonToolbar } from 'rsuite';
import TextFormField from 'components/FormFields/single/TextFormField';
import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';
import { useTranslation } from 'react-i18next';
import useForgotPasswordForm from 'hooks/forms/useForgotPasswordForm';
import { NavLink } from 'react-router-dom';

/**
 * Renders form where users can enter their email in order
 * to receive instructions on how to reset their password
 * @returns
 */
const ForgotPasswordForm = () => {
  // get translation helper
  const { t } = useTranslation();

  // get form s
  const form = useForgotPasswordForm();

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
        <TextFormField type="email" name="email" label={t('forgotPassword.emailLabel')} />

        <ButtonToolbar className={classes.FormBtnToolbar}>
          <ButtonSpinner
            type="submit"
            appearance="primary"
            label={t('forgotPassword.btnLabel')}
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

          <NavLink to="/">
            <p>Sign up.</p>
          </NavLink>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
