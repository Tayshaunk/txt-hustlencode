import ElipsisMenu from 'components/ElipsisMenu/ElipsisMenu';
import IsAuthed from 'components/IsAuthed/IsAuthed';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'rsuite';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';
// styles
import pageclasses from 'styles/modules/pageLayout.module.scss';
import classes from './ProfileModule.module.scss';

interface IProps {
  title: string;
  html: string;
  css: string;
  js: string;
  type: 'aboutWidget' | 'interestsWidget';
}

const ProfileModule = (props: IProps) => {
  const [height, setHeight] = useState<number>();

  const navigate = useNavigate();

  const { title, html, css, js, type } = props;

  // get current user
  const user = useAppSelector(getUser);

  // sets up code for module
  const code = `
  <html id="html">
      <head>
          <style>
          ${css}
          </style>
      </head>
      <body>
          ${html}
      </body>

      <script>
          ${js}
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
    if (user && user.username && type === 'aboutWidget') {
      navigate(`/${user.username}/profile/about/edit`);
    } else if (user && user.username && type === 'interestsWidget') {
      navigate(`/${user.username}/profile/interests/edit`);
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
        <p>{title}</p>
        <IsAuthed userId={user?._id}>
          <ElipsisMenu width={40} height={40} className={classes.menu} placement="leftStart" menuOptions={menu} isLoading={false} />
        </IsAuthed>
      </div>
      <div className={classes.content}>
        <iframe style={{ height: `${height}px`, width: '100%' }} title={title} srcDoc={code} onLoad={updateHeight} />
      </div>
    </div>
  );
};

export default ProfileModule;
