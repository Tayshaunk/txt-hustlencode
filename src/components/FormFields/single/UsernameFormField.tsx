// styles
import classes from 'styles/modules/form.module.scss';

import { forwardRef, ReactElement } from 'react';
import { Form, InputGroup } from 'rsuite';

interface ITextFormField {
  name: string; // name of the key to map to
  label: string; // field label
  type: 'text' | 'email' | 'number' | 'password';
  placeholder?: string; // field placeholder
  checkAsync?: boolean; // true if we need to perform async checks on form field
  renderMessage?: () => ReactElement<any>;
}

const UsernameFormField = forwardRef((props: ITextFormField, ref: any) => {
  const { checkAsync = false, placeholder = '', name, renderMessage, label, ...rest } = props;

  return (
    <Form.Group ref={ref} className={classes.FormField}>
      <Form.ControlLabel className={classes.FormLabel}>{label} </Form.ControlLabel>
      {checkAsync ? (
        <Form.Control checkAsync placeholder={placeholder} name={name} acceptor={InputGroup} {...rest} />
      ) : (
        <Form.Control placeholder={placeholder} name={name} acceptor={InputGroup} {...rest} />
      )}

      {renderMessage ? renderMessage() : null}
    </Form.Group>
  );
});

export default UsernameFormField;
