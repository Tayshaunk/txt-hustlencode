import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deletePostApi } from 'api/post.api';
import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';
import ElipsisMenu from 'components/ElipsisMenu/ElipsisMenu';
import FromNowDate from 'components/FromNowDate/FromNowDate';
import IsAuthed from 'components/IsAuthed/IsAuthed';
import { IHustlencodeUser } from 'interfaces/user.interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Modal } from 'rsuite';
import { serverErrorHandler } from 'services/server-error.service';
import { openSuccessToaster } from 'services/toast.service';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/slices/userSessionSlice';
import { getProfileImage } from 'util/profile.util';
// styles
import pageclasses from 'styles/modules/pageLayout.module.scss';
import classes from './PostModule.module.scss';

interface IProps {
  createdOn: Date;
  postId: string;
  postUser?: IHustlencodeUser;
  html: string;
  css: string;
  js: string;
  removePost: (id: string) => void;
}

const PostModule = (props: IProps) => {
  const { html, css, js, postUser, createdOn, postId, removePost } = props;

  // get redux dispatch
  const dispatch = useAppDispatch();

  // get router navigate
  const navigate = useNavigate();

  const logoutHandler = () => dispatch(logout);

  // height of the iframe that will render the code
  const [height, setHeight] = useState<number>();

  // loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

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
  const goToPostEditor = () => {
    if (postUser && postUser.username) {
      navigate(`/${postUser.username}/posts/${postId}/edit`);
    }
  };

  /**
   * Make request to delete post
   */
  const deletePost = async () => {
    try {
      setIsLoading(true);

      // make server request to delete post
      const response = await deletePostApi(postId);

      // show toaster
      openSuccessToaster(response.message, 3000);

      // hides loader
      setIsLoading(false);

      // removes post from feed
      removePost(postId);
    } catch (e) {
      setIsLoading(false);
      serverErrorHandler(e, logoutHandler);
    }
  };

  /**
   * Hide delete confirmation modal
   */
  const closeModal = () => {
    setShowModal(false);
  };

  /**
   * Show delete confirmation modal
   */
  const openModal = () => {
    setShowModal(true);
  };

  // menu options for the post menu
  const menu = [
    <Dropdown.Item className={pageclasses.menuItem} key={1} onClick={goToPostEditor}>
      Edit Post
    </Dropdown.Item>,
    <Dropdown.Item className={pageclasses.menuItem} key={2} onClick={openModal}>
      Delete Post
    </Dropdown.Item>,
  ];

  const renderHeader = () => (
    <div className={classes.header}>
      <div className={classes.imgContainer}>
        {postUser ? (
          <img src={getProfileImage(postUser.profileImg)} alt={`${postUser.name} profile thumbnail`} />
        ) : (
          <img src="https://hustlencode.s3.us-west-1.amazonaws.com/unspecified.jpg" alt="profile thumbnail" />
        )}
      </div>
      <div className={classes.nameContainer}>
        <div className={classes.name}>
          <p>{postUser?.name}</p>
        </div>
        <div>{createdOn ? <FromNowDate date={createdOn} /> : ''}</div>
      </div>
      <IsAuthed userId={postUser?._id}>
        <ElipsisMenu width={40} height={40} placement="leftStart" menuOptions={menu} isLoading={isLoading} />
      </IsAuthed>
    </div>
  );

  return (
    <div className={classes.container}>
      <Modal backdrop="static" role="alertdialog" open={showModal} onClose={closeModal} size="xs">
        <Modal.Body>
          <p>Are you sure you want to delete this post?</p>
        </Modal.Body>
        <Modal.Footer>
          <ButtonSpinner
            onClick={deletePost}
            color="red"
            type={'button'}
            appearance="primary"
            label={'Delete Post'}
            isLoading={isLoading}
            disabled={isLoading}
            size="sm"
          />
          <Button disabled={isLoading} size="sm" onClick={closeModal} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {renderHeader()}
      <div className={classes.content}>
        <iframe style={{ height: `${height}px`, width: '100%' }} title={`${postId}-post`} srcDoc={code} onLoad={updateHeight} />
      </div>
    </div>
  );
};

export default PostModule;
