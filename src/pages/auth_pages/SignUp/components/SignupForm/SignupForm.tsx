import { Schema, Form } from 'rsuite';
import { ReactElement, useMemo, useState } from 'react';
import TextFormField from 'components/FormFields/single/TextFormField';
import SelectFormField from 'components/FormFields/single/SelectFormField';
import { IPickerItem } from 'interfaces/picker.interface';
import DatePickerFormField from 'components/FormFields/single/DatePickerFormField';
import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';
import { ButtonToolbar } from 'rsuite';

// styles
import classes from './SignupForm.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import UsernameFormField from 'components/FormFields/single/UsernameFormField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
import { serverErrorHandler } from 'services/server-error.service';
import { IServerResponse } from 'interfaces/server.interface';
import { checkUsernameAvailApi } from 'api/account.api';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/slices/userSessionSlice';
import { HncSignupDto } from 'dtos/hustlencode-auth.dto';
import { signUpApi } from 'api/auth.api';
import { useNavigate } from 'react-router-dom';
import useSignUpForm from '../../../../../hooks/auth/useSignUpForm';
import { GENDER_DATA, PROGRAMS_DATA } from 'constants/picker.constants';

/**
 * Renders Sign Up form that allows users to create an account for HustleN'Code.
 * Users must provide the required information to create their accounts.
 * @returns
 */
const SignupForm = () => {
  // get form state
  const form = useSignUpForm();

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
    if (form.value.username.trim() !== '') {
      // return spinner if we are checking username
      if (form.isCheckingUsername) {
        return <FontAwesomeIcon className={classes.usernameSpinner} icon={faSpinner} spin />;
      } else {
        return <p className={form.isUsernameValid ? classes.validUsername : classes.invalidUsername}>{form.usernameMessage}</p>;
      }
    }

    return <p />;
  };

  return (
    <div className={classes.ContentWrapper}>
      <Form fluid={true} model={form.model} formValue={form.value} onChange={form.onChange}>
        <Container>
          <Row>
            <Col>
              <TextFormField type="text" name="firstName" label="First Name" />
            </Col>
            <Col>
              <TextFormField type="text" name="lastName" label="Last Name" />
            </Col>
          </Row>
          <TextFormField type="email" name="email" label="Email" />
          <UsernameFormField renderMessage={renderUsernameMessage} name="username" label={'Username'} type={'text'} />
          <Row>
            <Col>
              <SelectFormField name="gender" label="Gender" data={GENDER_DATA} />
            </Col>
            <Col>
              <SelectFormField name="organization" label="Organizations" data={PROGRAMS_DATA} />
            </Col>
          </Row>
          <Row>
            <Col>
              <DatePickerFormField name="birthday" label="Birthday" />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextFormField type="password" name="password" label="Password" />
              <TextFormField type="password" name="verifyPassword" label="Re-Enter your Password" />
            </Col>
          </Row>
          <ButtonToolbar className={classes.FormBtnToolbar}>
            <ButtonSpinner
              type="submit"
              appearance="primary"
              label="Create Account"
              isLoading={form.isLoading}
              disabled={form.isLoading}
              onClick={form.submit}
              containerStyles={{ width: '50%', margin: 'auto', display: 'block' }}
            />
          </ButtonToolbar>
        </Container>
      </Form>
    </div>
  );
};

export default SignupForm;
