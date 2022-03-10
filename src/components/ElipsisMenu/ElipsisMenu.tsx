import React from 'react';
import {  faEllipsisV, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown } from 'rsuite';

// styles
import classes from './ElipsisMenu.module.scss';

interface IProps {
  menuOptions: JSX.Element[];
  isLoading: boolean;
  placement: Placement;
  className?: any;
  width: number;
  height: number;
}

/**
 * Renders the menu for the container. Each item
 * in the items list is rendered as a menu item
 * @param props
 * @returns
 */
const ElipsisMenu = (props: IProps) => {
  const { width, height, className, menuOptions, isLoading, placement } = props;

  const toggleBtn = (btnProps: any, ref: any) => {
    return (
      <Button disabled={isLoading} {...btnProps} ref={ref} className={classes.MenuBtn}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </Button>
    );
  };

  return (
    <div style={{ width: width, height: height }} className={className}>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <Dropdown style={{ width: '100%', height: '100%' }} trigger="click" placement={placement} renderToggle={toggleBtn}>
          {menuOptions}
        </Dropdown>
      )}
    </div>
  );
};

export default ElipsisMenu;
