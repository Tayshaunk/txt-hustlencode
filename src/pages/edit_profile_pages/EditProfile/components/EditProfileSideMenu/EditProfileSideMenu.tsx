import { NavLink } from 'react-router-dom';
import classes from './EditProfileSideMenu.module.scss';

export interface IEditProfileMenuLink {
  label: string;
  to: string;
}

const links: IEditProfileMenuLink[] = [
  {
    label: 'General',
    to: '/account',
  },
  {
    label: 'Edit Profile',
    to: '/account/profile',
  },
  {
    label: 'Manage Password',
    to: '/account/password',
  },
];

const EditProfileSideMenu = () => {
  return <div className={classes.menu}>
      <ul>
      {
          links.map(link => (
              <li key={link.to}>
                  <NavLink to={link.to} className={({ isActive }) => `${classes.link} ${isActive ? classes.active : ''}`} end>
                      {link.label}
                  </NavLink>
              </li>
          ))
      }
      </ul>
  </div>;
};

export default EditProfileSideMenu;
