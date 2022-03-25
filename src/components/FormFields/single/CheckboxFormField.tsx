// styles
import classes from 'styles/modules/form.module.scss';

import { forwardRef } from 'react';
import { Checkbox, CheckboxGroup, Form } from 'rsuite';
import { ICheckboxData } from 'interfaces/picker.interface';

interface ICheckboxFormField {
  name: string; // name of the key to map to
  helpMessage?: string; // help message to display
  label: string; // field label
  checkboxes: ICheckboxData[]; // checkboxes to render
  className?: any; // custom class name for form field group
}

/**
 * Renders a checkbox
 */
const CheckboxFormField = forwardRef((props: ICheckboxFormField, ref: any) => {
  const { className, checkboxes, name, helpMessage, label, ...rest } = props;

  return (
    <Form.Group ref={ref} className={`${classes.FormField} ${className ? className : ''}`}>
      <Form.ControlLabel className={classes.FormLabel}>{label} </Form.ControlLabel>
      <Form.Control style={{ width: '100%', height: 38 }} accepter={CheckboxGroup} name={name} {...rest}>
        {checkboxes.map((c, i) => (
          <Checkbox key={i} value={c.value}>
            {c.label}
          </Checkbox>
        ))}
      </Form.Control>
      {helpMessage ? <Form.HelpText>{helpMessage}</Form.HelpText> : null}
    </Form.Group>
  );
});

export default CheckboxFormField;
