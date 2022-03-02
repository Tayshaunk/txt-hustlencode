import { Dropdown } from 'rsuite';
import { IHustlencodeUser } from 'interfaces/user.interface';

// styles
import classes from './NavBarProfileDropdown.module.scss';

/**
 * Renders the profile widget in the navbar
 * @param param0
 * @returns
 */
const NavBarProfileDropdown = (props: { user: IHustlencodeUser; logout: () => void }) => {
  /**
   * Returns the users profile image
   * @returns 
   */
  const getProfileImage = (): string => {
    if (props.user.profileImg) {
      const img = props.user.profileImg;
      if (img === 'assets/placeholders/male.jpg') {
        // return unspecified
        return 'https://hustlencode.s3.us-west-1.amazonaws.com/male.jpg';
      }

      if (img === 'assets/placeholders/female.jpg') {
        // return unspecified
        return 'https://hustlencode.s3.us-west-1.amazonaws.com/female.jpg';
      }

      if (img === 'assets/placeholders/unspecified.jpg') {
        // return unspecified
        return 'https://hustlencode.s3.us-west-1.amazonaws.com/unspecified.jpg';
      }

      return img;
    }

    // return unspecified
    return 'https://hustlencode.s3.us-west-1.amazonaws.com/unspecified.jpg';
  };

  return (
    <div className={classes.profileContainer}>
      {props.user ? (
        <Dropdown
          className={classes.dropdown}
          renderToggle={(prop: any, ref: any) => (
            <div {...prop} ref={ref} className={classes.profile}>
              <div className={classes.thumbnail}>
                <img style={{ width: '100%' }} src={getProfileImage()} alt="User profile" />
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
