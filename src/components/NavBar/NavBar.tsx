import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import NavBarProfileDropdown from 'components/NavBarProfileDropdown/NavBarProfileDropdown';
import { IHustlencodeUser } from 'interfaces/user.interface';

// styles
import classes from './NavBar.module.scss';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUser, logout } from 'store/slices/userSessionSlice';
import LogoBrand from 'components/Logos/LogoBrand/LogoBrand';

// export interface IProps {
//   sideMenuIsOpen: boolean;
//   user: IHustlencodeUser | null;
//   token: string | null;
//   logout: () => void;
//   toggle: () => void;
// }

/**
 * Renders navigation menu.
 * @param param0
 * @returns
 */
const NavBar = () => {
  // const { user, token, sideMenuIsOpen, logout, toggle } = props;

  // user session
  const user = useAppSelector(getUser);

  // get store dispatch
  const dispatch = useAppDispatch();

  // logs user out
  const logoutHandler = () => dispatch(logout());

  return (
    <Navbar className={classes.navbar}>
      <Navbar.Brand className={classes.brandContainer}>
        <NavLink end to="/">
          <LogoBrand color="white" />
        </NavLink>
      </Navbar.Brand>

      {user ? <NavBarProfileDropdown user={user} logout={logoutHandler} /> : null}
    </Navbar>
  );
};

export default NavBar;
