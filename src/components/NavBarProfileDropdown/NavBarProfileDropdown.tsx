import { Dropdown } from 'rsuite';
import { IHustlencodeUser } from 'interfaces/user.interface';
import { getProfileImage } from 'util/profile.util';

// styles
import classes from './NavBarProfileDropdown.module.scss';

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
  return (
    <div className={classes.profileContainer}>
      {props.user ? (
        <Dropdown
          className={classes.dropdown}
          renderToggle={(prop: any, ref: any) => (
            <div {...prop} ref={ref} className={classes.profile}>
              <div className={classes.thumbnail}>
                <img style={{ width: '100%' }} src={getProfileImage(props.user.profileImg)} alt="User profile" />
              </div>

              <div className={classes.info}>
                <p className={classes.name}>{`${props.user.firstName} ${props.user.lastName}`}</p>
                {/* <p className={classes.type}>{`${props.user.type}`}</p> */}
              </div>
            </div>
          )}
        >
          <Dropdown.Item className={classes.dropdownLink} onClick={() => props.logout()}>
            Logout
          </Dropdown.Item>
        </Dropdown>
      ) : null}
    </div>
  );
};

export default NavBarProfileDropdown;
