import { Dropdown } from 'rsuite';
import { IHustlencodeUser } from 'interfaces/user.interface';
import { getProfileImage } from 'util/profile.util';
import { useNavigate } from 'react-router-dom';
import { Toggle } from 'rsuite';
import { getColorTheme, setTheme } from 'store/slices/userSessionSlice';
// styles
import classes from './NavBarProfileDropdown.module.scss';
import { IDropdownMenuItem } from 'interfaces/dropdown.interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface IProps {
  user: IHustlencodeUser;
  logout: () => void;
}

/**
 * Renders the profile widget in the navbar
 * @param param0
 * @returns
 */
const NavBarProfileDropdown = (props: IProps) => {
  const { user, logout } = props;

  const navigate = useNavigate();

  // get store dispatcher
  const dispatch = useAppDispatch();

  // get current theme
  const theme = useAppSelector(getColorTheme);

  const switchTheme = () => {
    const newTheme: ColorTheme = theme === 'light' ? 'dark' : 'light';
    console.log(newTheme);
    // call action to update theme
    dispatch(setTheme(newTheme));
  };

  // Dropdown menu items
  const dropdown: IDropdownMenuItem[] = [
    { label: 'Explore', url: '/' },
    { label: 'My Profile', url: `/user/${user.username}` },
    { label: 'Profile Settings', url: `/account` },
    { label: 'Edit Layout', url: `/edit/profile/layout` },
  ];

  return (
    <div className={classes.profileContainer}>
      {user ? (
        <Dropdown
          trigger="click"
          className={classes.dropdown}
          placement="bottomEnd"
          renderToggle={(prop: any, ref: any) => (
            <div {...prop} ref={ref} className={classes.profile}>
              <div className={classes.thumbnail}>
                <img style={{ width: '100%' }} src={getProfileImage(user.profileImg, user.gender)} alt="User profile" />
              </div>

              <div className={classes.info}>
                <p className={classes.name}>{`${user.firstName} ${user.lastName}`}</p>
              </div>
            </div>
          )}
        >
          {dropdown.map((dLink: IDropdownMenuItem) => (
            <Dropdown.Item key={dLink.label} className={classes.dropdownLink} onSelect={() => navigate(dLink.url)}>
              {dLink.label}
            </Dropdown.Item>
          ))}

          <Dropdown.Item className={classes.dropdownLink} onClick={logout}>
            Sign Out
          </Dropdown.Item>

          <Dropdown.Item className={classes.dropdownLink}>
            <Toggle
              checked={theme === 'light' ? true : false}
              arial-label="Switch"
              onChange={switchTheme}
              checkedChildren="light"
              unCheckedChildren="dark"
            />{' '}
          </Dropdown.Item>
        </Dropdown>
      ) : null}
    </div>
  );
};

export default NavBarProfileDropdown;
