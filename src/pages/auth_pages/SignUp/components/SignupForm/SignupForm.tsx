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

// Extract schema types for form validation
const { StringType, DateType } = Schema.Types;

/**
 * Define validation model for login form.
 * User must provide a valid email and password
 * in order to submit the form.
 *
 * rsuite(5.5.2): https://rsuitejs.com/components/form-validation/
 */
const model = Schema.Model({
  firstName: StringType().isRequired('Please enter your First Name'),
  lastName: StringType().isRequired('Please enter your Last Name'),
  email: StringType()
    .isRequired('Please enter your Personal Email')
    .isEmail('Please Enter a valid email, e.g. johndoe03@email.com'),
  username: StringType().isRequired('Set your username. e.g. john_doe'),
  password: StringType().isRequired('Create a password').minLength(4, 'Password must be 4 characters long.'),
  verifyPassword: StringType()
    .isRequired('Please Re-Enter your Password.')
    .addRule((value, data) => {
      console.log(value);
      if (value !== data.password) {
        return false;
      }
      return true;
    }, 'The two passwords do not match'),
  gender: StringType().isRequired('Choose your gender'),
  organization: StringType().isRequired('Choose organization'),
  birthday: DateType().isRequired('Enter your Birthday'),
});

const INIT_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  verifyPassword: '',
  organization: '',
  birthday: new Date(),
  gender: ''
};

const GENDER_DATA: IPickerItem[] = [
  {
    label: 'Male',
    value: 'Male',
    role: '',
  },
  {
    label: 'Female',
    value: 'Female',
    role: '',
  },
  {
    label: 'Unspedified',
    value: 'Unspecified',
    role: '',
  },
];

const PROGRAMS_DATA: IPickerItem[] = [
  {
    label: 'Urban TXT',
    value: 'Urban TXT',
    role: 'Urban TXT',
  },
  {
    label: 'DIY Girls',
    value: 'DIY Girls',
    role: 'DIY Girls',
  },
  {
    label: 'Expand LA',
    value: 'Expand LA',
    role: 'Expand LA',
  },
  {
    label: 'HNC Hackathon',
    value: 'HNC Hackathon',
    role: 'HNC Hackathon',
  },
  {
    label: 'Other',
    value: 'Other',
    role: 'Other',
  },
];

/**
 * Renders Sign Up form that allows users to create an account for HustleN'Code.
 * Users must provide the required information to create their accounts.
 * @returns
 */
const SignupForm = () => {
  const [formValue, setFormValue] = useState<HncSignupDto>(INIT_FORM); // set default form values
  const [isLoading, setIsLoading] = useState(false); // flag for submission process
  const [isCheckingUsername, setIsCheckingUsername] = useState(false); // flag for checking username process
  const [isUsernameValid, setIsUsernameValid] = useState(true); // true if username is valid
  const [usernameMessage, setUsernameMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  // get dispatc
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitForm = async() => {
    try{
      setIsLoading(true);

      // get user session token
      const token:string = await signUpApi(formValue);

      // store token
      //dispatch(setToken(token))

      // redirect to profile page
      // navigate('')
      setIsLoading(false);
    }catch(e){
      setIsLoading(false);
      serverErrorHandler(e, logoutHandler)
    }
  };

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
    if (formValue.username.trim() !== '') {
      // return spinner if we are checking username
      if (isCheckingUsername) {
        return <FontAwesomeIcon className={classes.usernameSpinner} icon={faSpinner} spin />;
      } else {
        return <p className={isUsernameValid ? classes.validUsername : classes.invalidUsername}>{usernameMessage}</p>;
      }
    }

    return <p />;
  };


  const onChange = (val: any) => {
    /**
     * check username if:
     * username is not the same as current username
     * username is not empty
     * username is value has changed
     */
    if (val.username.trim() !== '' && formValue.username !== val.username) {
      setIsCheckingUsername(true);
      debouncedChangeHandler(val.username);
    } else setIsCheckingUsername(false);

    // update form state
    setFormValue(val);
  };

  /**
   * Makes API request to check if the username is
   * available
   * @param val
   */
  const asyncCheckUsername = async (val: string): Promise<void> => {
    if (val.trim() !== '') {
      try {
        // make request to check for username availability
        const response: IServerResponse = await checkUsernameAvailApi(val);
        // hide spinner
        setIsCheckingUsername(false);
        // update username status
        setIsUsernameValid(response.payload);
        setUsernameMessage(response.message);
      } catch (e) {
        setIsCheckingUsername(false);
        serverErrorHandler(e, logoutHandler);
      }
    }
  };

  /**
   * debounce search with 300ms wait time
   * Ignore continous search calls until  timer has
   * elapsed
   */
  const debouncedChangeHandler = useMemo(
    () => debounce(asyncCheckUsername, 300),
    // TODO Resolve 'react-hooks/exhaustive-deps'
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div className={classes.ContentWrapper}>
      <Form fluid={true} model={model} formValue={formValue} onChange={onChange}>
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
              isLoading={isLoading}
              disabled={isLoading}
              onClick={submitForm}
              containerStyles={{ width: '50%', margin: 'auto', display: 'block' }}
            />
          </ButtonToolbar>
        </Container>
      </Form>
    </div>
  );
};

export default SignupForm;
