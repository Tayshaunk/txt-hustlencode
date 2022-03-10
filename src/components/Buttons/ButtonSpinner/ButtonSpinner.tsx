import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties } from 'react';
import { Button } from 'rsuite';

export interface IProps {
  size?: 'lg' | 'md' | 'sm' | 'xs';
  type: 'button' | 'submit' | 'reset' | undefined;
  appearance: Appearance; // RSUITE button appearance
  color?: Color | undefined; // RSUITE button color - appearance must be 'primary'
  label: string;
  className?: string; // class names for button container
  isLoading: boolean;
  disabled: boolean;
  containerStyles?: CSSProperties; // styles for Button container
  onClick: () => void;
}

/**
 * Renders button with custom label that
 * shows a spinner when a async action is loading
 * @param props
 * @returns
 */
const ButtonSpinner = (props: IProps) => {
  const { size = 'md', color, containerStyles, type, label, className, isLoading, onClick, ...rest } = props;

  return (
    <Button
      size={size}
      color={color}
      style={containerStyles ? containerStyles : {}}
      type={type}
      className={className ? className : ''}
      onClick={onClick}
      {...rest}
    >
      {isLoading ? <FontAwesomeIcon style={{ paddingLeft: 4, paddingRight: 4, paddingTop:1, paddingBottom: 1 }} spin icon={faSyncAlt} /> : <p>{label}</p>}
    </Button>
  );
};

export default ButtonSpinner;
