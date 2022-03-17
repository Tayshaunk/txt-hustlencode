import ElipsisMenu from 'components/ElipsisMenu/ElipsisMenu';
import IsAuthed from 'components/IsAuthed/IsAuthed';
import PageLoader from 'components/PageLoader/PageLoader';
import useProfileAbout from 'hooks/useProfileAbout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'rsuite';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';
// styles
import pageclasses from 'styles/modules/pageLayout.module.scss';
import classes from './ProfileAboutModule.module.scss';

const ProfileAboutModule = ({ username }: { username: string }) => {
  const [height, setHeight] = useState<number>();

  const navigate = useNavigate();

  // get current user
  const user = useAppSelector(getUser);

  const profileAbout = useProfileAbout(username);

  // sets up code for module
  const code = `
  <html id="html">
      <head>
          <style>
          ${profileAbout.value?.css}
          </style>
      </head>
      <body>
      ${profileAbout.value?.html}
      </body>

      <script>
      ${profileAbout.value?.js}
      </script>
  
  </html>
  `;

  /**
   * Gets the real heigh of the iframe and stores it in state
   * Once the value is stored, the height value is applied
   * to the iframe
   * @param e
   */
  const updateHeight = (e: any) => {
    const h = e.target.contentWindow.document.getElementById('html').offsetHeight;
    setHeight(h);
  };

  /**
   * Navigates user to the editor post page
   */
  const goToEditor = () => {
    if (user) {
      navigate(`/edit/profile/about`);
    }
  };

  const menu = [
    <Dropdown.Item className={pageclasses.menuItem} key={1} onClick={goToEditor}>
      Edit
    </Dropdown.Item>,
  ];

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p>About</p>

        <IsAuthed type="username" value={username}>
          <ElipsisMenu width={40} height={40} className={classes.menu} placement="leftStart" menuOptions={menu} isLoading={false} />
        </IsAuthed>
      </div>
      <div className={classes.content}>
        {profileAbout.isDoneLoading ? (
          <iframe style={{ height: `${height}px`, width: '100%' }} title={username} srcDoc={code} onLoad={updateHeight} />
        ) : (
          <PageLoader isVisible={true} fullscreen={false} theme={'light'} />
        )}
      </div>
    </div>
  );
};

export default ProfileAboutModule;
