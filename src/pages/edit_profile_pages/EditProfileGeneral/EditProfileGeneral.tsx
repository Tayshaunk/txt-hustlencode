import { Form, ButtonToolbar } from 'rsuite';
import TextFormField from 'components/FormFields/single/TextFormField';
import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';

// styles
import classes from './EditProfileGeneral.module.scss';
import useEditProfileGeneral from 'hooks/forms/useEditProfileGeneral';

/**
 * Render form where user can update their username
 * @returns
 */
const EditProfileGeneral = () => {
  // get form
  const form = useEditProfileGeneral();

  return (
    <div className={classes.ContentWrapper}>
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
    </div>
  );
};

export default EditProfileGeneral;
