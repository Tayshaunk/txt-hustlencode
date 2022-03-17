import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import NavBarProfileDropdown from 'components/NavBarProfileDropdown/NavBarProfileDropdown';
import { IHustlencodeUser } from 'interfaces/user.interface';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUser, logout } from 'store/slices/userSessionSlice';
import LogoBrand from 'components/Logos/LogoBrand/LogoBrand';
import useIsMobile from 'hooks/useIsMobile';
import Aux from 'components/_Aux/_Aux';
import MobileNavMenu from 'components/MobileNavMenu/MobileNavMenu';
import NavbarSearch from 'components/NavBarSearch/NavBarSearch';

// styles
import classes from './NavBar.module.scss';

/**
 * Renders navigation menu.
 * @param param0
 * @returns
 */
const NavBar = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  // user session
  const user = useAppSelector(getUser);

  // get store dispatch
  const dispatch = useAppDispatch();

  // logs user out
  const logoutHandler = () => dispatch(logout());

  const isMobile = useIsMobile();

  const renderMobileMenuToggle = () => (
    <Aux>
      {isMobile.value ? (
        <div
          className={`${classes.burger} ${isActive ? classes.burgerActive : ''}`}
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <div className={classes.burgerStrip}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : null}
    </Aux>
  );

  const renderProfileDropDown = (user: IHustlencodeUser) => (
    <Aux>{isMobile.value ? null : <NavBarProfileDropdown user={user} logout={logoutHandler} />}</Aux>
  );

  return (
    <Aux>
      <Navbar className={classes.navbar}>
        <Navbar.Brand className={classes.brandContainer}>
          {isMobile.value ? (
            <div>
              <LogoBrand color="white" />
            </div>
          ) : (
            <NavLink end to="/">
              <LogoBrand color="white" />
            </NavLink>
          )}
        </Navbar.Brand>

        <NavbarSearch />

        {renderMobileMenuToggle()}

        {user ? renderProfileDropDown(user) : null}
      </Navbar>

      {isActive && isMobile.value && user ? (
        <MobileNavMenu
          user={user}
          hide={() => {
            setIsActive(false);
          }}
          logout={logoutHandler}
        />
      ) : null}
    </Aux>
  );
};

export default NavBar;
