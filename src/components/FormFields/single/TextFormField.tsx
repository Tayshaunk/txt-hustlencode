// styles
import classes from 'styles/modules/form.module.scss';

import { forwardRef } from 'react';
import { Form, InputGroup } from 'rsuite';

interface ITextFormField{
  name: string // name of the key to map to
  helpMessage?: string;// help message to display
  label: string; // field label
  type: 'text'| 'email'|'number'|'password';
}
const TextFormField = forwardRef((props: ITextFormField, ref: any) => {
  const { name, helpMessage, label, ...rest } = props;

  return (
    <Form.Group ref={ref} className={classes.FormField} >
      <Form.ControlLabel className={classes.FormLabel}>{label} </Form.ControlLabel>
      <Form.Control name={name} acceptor={InputGroup} {...rest} />
      {helpMessage ? <Form.HelpText>{helpMessage}</Form.HelpText> : null}
    </Form.Group>
  );
});

export default TextFormField;
