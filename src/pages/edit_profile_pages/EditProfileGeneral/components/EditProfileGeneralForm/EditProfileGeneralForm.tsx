import { Form, ButtonToolbar } from 'rsuite';
import TextFormField from 'components/FormFields/single/TextFormField';
import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';

// styles
import classes from './EditProfileGeneralForm.module.scss';
import useEditProfileGeneral from 'hooks/forms/useEditProfileGeneral';

/**
 * This component renders a form that allows the user to
 * update their first name and last name
 * @returns 
 */
const EditProfileGeneralForm = () => {
  // get form state
  const form = useEditProfileGeneral();

  return (
    <Form
      formValue={form.value}
      fluid={true}
      className={classes.CustomForm}
      model={form.model}
      onChange={(val: any) => form.onChange(val)}
    >
      <TextFormField type="text" name="firstName" label={'First Name'} />

      <TextFormField type="text" name="lastName" label={'Last Name'} />

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
  );
};

export default EditProfileGeneralForm;
