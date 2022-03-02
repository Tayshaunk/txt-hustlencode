// styles
import classes from 'styles/modules/form.module.scss';

import { forwardRef } from 'react';
import { Form, Input, InputGroup } from 'rsuite';

interface ITextFormField {
  name: string; // name of the key to map to
  helpMessage?: string; // help message to display
  label: string; // field label
  rows: number; // number of rows to render
}

// @ts-ignore
const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const TextAreaFormField = forwardRef((props: ITextFormField, ref: any) => {
  const { name, helpMessage, label, ...rest } = props;

  return (
    <Form.Group ref={ref} className={classes.FormField}>
      <Form.ControlLabel className={classes.FormLabel}>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={Textarea} {...rest} />
      {helpMessage ? <Form.HelpText>{helpMessage}</Form.HelpText> : null}
    </Form.Group>
  );
});

export default TextAreaFormField;
