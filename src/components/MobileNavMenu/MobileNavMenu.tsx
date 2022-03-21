import Fade from 'components/Fade/Fade';
import { IHustlencodeUser } from 'interfaces/user.interface';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import styles
import classes from './MobileNavMenu.module.scss';

interface IProps {
  user: IHustlencodeUser;
  logout: () => void;
  hide: () => void;
}

const MobileNavMenu = ({ user, logout, hide }: IProps) => {
  const navigate = useNavigate();
  /**
   * Prevents scrolling when component is mounted
   */
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      // prevent scrolling
      const body = document.querySelector('body');
      if (body) {
        body.style.overflow = 'hidden';
      }
    }

    return () => {
      mounted = false;

      // re-enable scrolling
      const body = document.querySelector('body');
      if (body) {
        body.style.removeProperty('overflow');
      }
    };
  }, []);

  // close menu and navigate user to new page
  const closeAndNav = (url: string) => {
    hide();
    navigate(url);
  };

  const menu = [
    { label: 'Explore', action: () => closeAndNav(`/`) },
    { label: 'My Profile', action: () => closeAndNav(`/user/${user.username}`) },
    { label: 'Profile Settings', action: () => closeAndNav(`/account`) },
    { label: 'Edit Layout', action: () => closeAndNav(`/edit/profile/layout`) },
    { label: 'Logout', action: logout },
  ];

  return (
    <div className={classes.mobileMenuContainer}>
      <Fade duration={150} delay={10}>
        <div className={classes.mobileMenu}>
          <ul>
            {menu.map(m => (
              <li key={m.label}>
                <p onClick={m.action}>{m.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </Fade>
    </div>
  );
};

export default MobileNavMenu;
