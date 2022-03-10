import { ICode } from 'interfaces/post.interface';
import { useState } from 'react';
// import styles
import classes from './ProfilePreviewModule.module.scss';

interface IProps {
  title: string;
  profileCode: ICode;
  key: 'aboutWidget' | 'interestsWidget';
}

const ProfilePreviewModule = (props: IProps) => {
  const [height, setHeight] = useState<number>();

  // get props
  const { title, profileCode } = props;

  // sets up code for module
  const code = `
  <html id="html">
      <head>
          <style>
          ${profileCode.css}
          </style>
      </head>
      <body>
          ${profileCode.html}
      </body>

      <script>
          ${profileCode.js}
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

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p>{title}</p>
      </div>
      <div className={classes.content}>
        <iframe style={{ height: `${height}px`, width: '100%' }} title={title} srcDoc={code} onLoad={updateHeight} />
      </div>
    </div>
  );
};

export default ProfilePreviewModule;
