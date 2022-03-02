// styles
import classes from 'styles/modules/form.module.scss';
import { forwardRef } from 'react';
import { Form, SelectPicker } from 'rsuite';
import { IPickerItem } from 'interfaces/picker.interface';
interface ISelectFormField{
  name: string // name of the key to map to
  helpMessage?: string;// help message to display
  label: string; // field label
  data: IPickerItem[]
}

/**
 * Renders a select picker
 */
const SelectFormField = forwardRef((props: ISelectFormField, ref: any) => {
  const { name, helpMessage, label, data, ...rest } = props;

  return (
    <Form.Group ref={ref} className={classes.FormField} >
      <Form.ControlLabel className={classes.FormLabel}>{label} </Form.ControlLabel>
      <Form.Control style={{width: '100%', height: 38}} accepter={SelectPicker} name={name}  data={data} placement="auto" {...rest} />
      {helpMessage ? <Form.HelpText>{helpMessage}</Form.HelpText> : null}
    </Form.Group>
  );
});

export default SelectFormField;
