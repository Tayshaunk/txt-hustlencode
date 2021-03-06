// styles
import classes from './LoginForm.module.scss';
import { useEffect, useState } from 'react';
import { Schema, Form, ButtonToolbar } from 'rsuite';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearStoredEmail, getEmail, setStoredEmail, setToken } from 'store/slices/userSessionSlice';
import { serverErrorHandler } from 'services/server-error.service';
import TextFormField from 'components/FormFields/single/TextFormField';
import CheckboxFormField from 'components/FormFields/single/CheckboxFormField';
import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';
import { getFormValidationStatus } from 'util/form.util';
import { useTranslation } from 'react-i18next';
import { loginApi } from 'api/auth.api';
import { NavLink } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

// Extract schema types for form validation
const { StringType } = Schema.Types;

/**
 * Define validation model for login form.
 * User must provide a valid email and password
 * in order to submit the form.
 *
 * rsuite(5.5.2): https://rsuitejs.com/components/form-validation/
 */
const model = Schema.Model({
  email: StringType().isRequired('Please enter a valid email.').isEmail('Please enter a valid email.'),
  password: StringType().isRequired('Please enter your password.'),
});

const INIT_FORM = { email: '', password: '', saveEmail: [] };

/**
 * Renders login form that allows users to login using their credentials.
 * Users must provide a valid email and password to login.
 * @returns
 */
const LoginForm = () => {
  const [formValue, setFormValue] = useState<any>(INIT_FORM); // set default form values
  const [isLoading, setIsLoading] = useState(false); // flag for submission process

  // get translation helper
  const { t } = useTranslation();

  // get redux store dispatch
  const dispatch = useAppDispatch();

  // get stored email
  const storedEmail = useAppSelector(getEmail);

  // set stored login email in form state
  useEffect(() => {
    let mounted = true;

    if (mounted && storedEmail) setFormValue({ ...INIT_FORM, saveEmail: ['true'], email: storedEmail });

    return () => {
      mounted = false;
    };
  }, [storedEmail]);

  /**
   * Makes server request to validate user credentials.
   * Users with valid credentials are authenticated and
   * redirect to the authenticated routes
   */
  const submitForm = async () => {
    try {
      // verify that form is valid
      if (getFormValidationStatus(model.check(formValue))) {
        // show spinner
        setIsLoading(true);

        // make copy of form value
        const payload = { ...formValue };

        // Remove saveEmail key - it is not needed for login api request
        // @ts-ignore
        delete payload.saveEmail;

        /**
         * Makes server request to validate user's credentials.
         * If user credentials are valid, the user's session token
         * is returned
         **/
        const token: string = await loginApi(payload);

        // update stored email value if user checked off 'remember me'
        if (formValue.saveEmail.length > 0 && formValue.saveEmail[0]) dispatch(setStoredEmail(payload.email));
        else dispatch(clearStoredEmail()); // otherwise clear

        // hide spinner
        setIsLoading(false);

        // stores users session toke, once its
        // set. user is redirected to auth routes
        dispatch(setToken(token));
      }
    } catch (e) {
      // hide spinner
      setIsLoading(false);
      serverErrorHandler(e, () => {});
    }
  };
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className={classes.ContentWrapper} data-theme={theme}>
      <Form fluid={true} className={classes.CustomForm} model={model} formValue={formValue} onChange={setFormValue}>
        <TextFormField type="email" name="email" label={t('login.emailLabel')} />

        <TextFormField type="password" name="password" label={t('login.passwordLabel')} />

        <CheckboxFormField
          name="saveEmail"
          label=""
          className={classes.checkField}
          checkboxes={[
            {
              label: t('login.rememberMeLabel'),
              value: 'true',
            },
          ]}
        />

        <ButtonToolbar className={classes.FormBtnToolbar}>
          <ButtonSpinner
            type="submit"
            appearance="primary"
            label={t('login.btnLabel')}
            isLoading={isLoading}
            disabled={isLoading}
            onClick={submitForm}
            containerStyles={{ width: '100%' }}
          />
        </ButtonToolbar>

        <div className={classes.helpLinks}>
          <NavLink to="/forgot-password">
            <p>Forgot password?</p>
          </NavLink>

          <NavLink to="/">
            <p>Sign up.</p>
          </NavLink>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
