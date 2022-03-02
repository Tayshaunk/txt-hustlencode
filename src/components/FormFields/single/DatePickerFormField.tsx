// styles
import classes from 'styles/modules/form.module.scss';

import { forwardRef } from 'react';
import { DatePicker, Form } from 'rsuite';

/**
 * Renders a date picker
 */
const DatePickerFormField = forwardRef((props: any, ref: any) => {
  const { name, helpMessage, label, ...rest } = props;

  return (
    <Form.Group ref={ref} className={classes.FormField}>
      <Form.ControlLabel className={classes.FormLabel}>{label} </Form.ControlLabel>
      <Form.Control format="MM/dd/yyyy" style={{ width: '100%', height: 38 }} name={name} accepter={DatePicker} oneTap {...rest} placement="auto" />
      {helpMessage ? <Form.HelpText>{helpMessage}</Form.HelpText> : null}
    </Form.Group>
  );
});

export default DatePickerFormField;
