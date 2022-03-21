import FromNowDate from 'components/FromNowDate/FromNowDate';
import { ICode } from 'interfaces/post.interface';
import { IHustlencodeUser } from 'interfaces/user.interface';
import { useState } from 'react';
import { getProfileImage } from 'util/profile.util';
// import styles
import classes from './PostPreviewModule.module.scss';

interface IProps {
  createdOn: Date;
  postCode: ICode;
  postUser: IHustlencodeUser | null | undefined;
}

const PostPreviewModule = (props: IProps) => {
  const { postUser, createdOn, postCode } = props;

  // height of the iframe that will render the code
  const [height, setHeight] = useState<number>();

  // sets up code for module
  const code = `
  <html id="html">
      <head>
          <style>
          ${postCode.css}
          </style>
      </head>
      <body>
          ${postCode.html}
      </body>

      <script>
          ${postCode.js}
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

  const renderHeader = () => (
    <div className={classes.header}>
      <div className={classes.imgContainer}>
        {postUser ? (
          <img src={getProfileImage(postUser.profileImg, postUser.gender)} alt={`${postUser.name} profile thumbnail`} />
        ) : (
          <img src="https://hustlencode.s3.us-west-1.amazonaws.com/unspecified.jpg" alt="profile thumbnail" />
        )}
      </div>
      <div className={classes.nameContainer}>
        <div className={classes.name}>
          <p>{postUser?.name}</p>
        </div>
        <div>{createdOn ? <FromNowDate date={createdOn} /> : <FromNowDate date={new Date()} />}</div>
      </div>
    </div>
  );
  return (
    <div className={classes.container}>
      {renderHeader()}
      <div className={classes.content}>
        <iframe style={{ height: `${height}px`, width: '100%' }} title={`${new Date().getTime()}-post`} srcDoc={code} onLoad={updateHeight} />
      </div>
    </div>
  );
};

export default PostPreviewModule;
