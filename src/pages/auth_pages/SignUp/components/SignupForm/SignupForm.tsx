import { Schema, Form } from 'rsuite';
import { useState } from 'react';
import TextFormField from 'components/FormFields/single/TextFormField';
import SelectFormField from 'components/FormFields/single/SelectFormField';
import { IPickerItem } from 'interfaces/picker.interface';
import DatePickerFormField from 'components/FormFields/single/DatePickerFormField';
import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';
import { ButtonToolbar } from 'rsuite';

// styles
import classes from './SignupForm.module.scss';
import { Container, Row, Col } from 'react-bootstrap';

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
  password: StringType().isRequired('Create a password'),
  verfiyPassword: StringType()
    .addRule((val, data) => {
      console.log('user input: ', val);
      if (val !== data.password) {
        return false;
      }
      return true;
    }, 'The two passwords do not match')
    .isRequired('Please Re-Enter your Password.'),
  gender: StringType().isRequired('Choose your gender'),
  program: StringType().isRequired('Choose Program'),
  birthday: DateType().isRequired('Enter your Birthday'),
});

const INIT_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  verifyPassword: '',
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
  const [formValue, setFormValue] = useState<any>(INIT_FORM); // set default form values
  const [isLoading, setIsLoading] = useState(false); // flag for submission process

  const submitForm = () => {
    console.log(model);
  };

  return (
    <div className={classes.ContentWrapper}>
      <Form fluid={true} model={model} formValue={formValue} onChange={setFormValue}>
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
          <TextFormField type="text" name="username" label="Username" />
          <Row>
            <Col>
              <TextFormField type="password" name="password" label="Password" />
            </Col>
            <Col>
              <TextFormField type="password" name="verifyPassword" label="Re-Enter your Password" />
            </Col>
          </Row>
          <Row>
            <Col>
              <SelectFormField name="gender" label="Gender" data={GENDER_DATA} />
            </Col>
            <Col>
              <SelectFormField name="program" label="Programs" data={PROGRAMS_DATA} />
            </Col>
          </Row>
          <Row>
            <Col>
              <DatePickerFormField name="birthday" label="Birthday" />
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
