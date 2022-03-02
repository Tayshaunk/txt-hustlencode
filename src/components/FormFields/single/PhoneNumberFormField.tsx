// styles
import classes from "styles/modules/form.module.scss";

import PhoneInput from "react-phone-input-2";
import { forwardRef } from "react";
import { Form } from "rsuite";

const PhoneNumberFormField = forwardRef((props: any, ref: any) => {
  const { label, value, onChange } = props;

  return (
    <Form.Group ref={ref} className={classes.FormField} style={{ flex: 1 }}>
      <Form.ControlLabel className={classes.FormLabel}>
        {label}{" "}
      </Form.ControlLabel>
      <PhoneInput
        inputStyle={{ width: "100%", height: 38 }}
        country={"us"}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
});

export default PhoneNumberFormField;
