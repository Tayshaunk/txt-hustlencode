// classes
import classes from './ButtonSpinner.module.scss';

import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties } from 'react';
import { Button } from 'rsuite';

export interface IFormButton {
  type: 'button' | 'submit' | 'reset' | undefined;
  appearance: 'default' | 'primary' | 'link' | 'subtle' | 'ghost';
  label: string;
  className?: string; // class names for button container
  isLoading: boolean;
  disabled: boolean;
  containerStyles?: CSSProperties; // styles for Button container
  color?: any;
  onClick: () => void;
}

/**
 * Renders button with custom label that
 * show a spinner when a async action is loading
 * @param props
 * @returns
 */
const ButtonSpinner = (props: IFormButton) => {
  const { containerStyles, type, label, className, isLoading, onClick, ...rest } = props;

  return (
    <Button style={containerStyles ? containerStyles : {}} type={type} className={className ? className : ''} onClick={onClick} {...rest}>
      {isLoading ? (
        <div className={classes.spinnerContainer}>
          <FontAwesomeIcon spin icon={faSyncAlt} />
        </div>
      ) : (
        <p>{label}</p>
      )}
    </Button>
  );
};

export default ButtonSpinner;
