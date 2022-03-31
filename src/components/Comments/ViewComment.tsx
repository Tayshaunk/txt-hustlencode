import { useState } from 'react';
import { IHustlencodeUserSession } from 'interfaces/user.interface';
import { NavLink } from 'react-router-dom';
import ElipsisMenu from 'components/ElipsisMenu/ElipsisMenu';
import { Button, Dropdown, Modal } from 'rsuite';

// styles
import classes from './ViewComment.module.scss';
import pageclasses from 'styles/modules/pageLayout.module.scss';
import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';

interface CommmentProps {
  profileImg: string;
  name: string;
  comment: string;
  commentUser: IHustlencodeUserSession;
  postDate: string;
}

// comment dummy data
const userPostDummy = {
  profileImg: 'https://hustlencode.s3.us-west-1.amazonaws.com/unspecified.jpg',
  name: 'Miguel Menjivar',
  comment: 'hello everyone, this is a nice post!!',
  postDate: 'Just now',
  username: 'miguel-txt',
};

const ViewComment = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  /**
   * edits the comment
   */
  const editComment = () => {
    console.log('editing your comment!');
  };

  /**
   * deletes the comment
   */
  const deleteComment = () => {
    console.log('delete your comment!');
  };

  /**
   * Hide delete comment modal
   */
  const closeModal = () => {
    setShowModal(false);
  };

  /**
   * Show delete confirmation modal when deleting comment
   */
  const openModal = () => {
    setShowModal(true);
  };

  const menu = [
    <Dropdown.Item className={pageclasses.menuItem} key={1} onClick={editComment}>
      Edit Comment
    </Dropdown.Item>,
    <Dropdown.Item className={pageclasses.menuItem} key={2} onClick={openModal}>
      Delete Comment
    </Dropdown.Item>,
  ];

  const renderHeading = () => (
      <div>
        <div className={classes.header}>
        <div className={classes.imgContainer}>
            {/* TODO: make sure to finish this and make it dynamic if user does not have profile picture */}
            <img src={userPostDummy.profileImg} alt={`${userPostDummy.name} profile thumbnail`} />
        </div>

        <div className={classes.nameContainer}>
            <div className={classes.name}>
            <NavLink to={`/user/${userPostDummy.username}`}>{userPostDummy.name}</NavLink>
            </div>
            <div><span className={classes.dateColor}>{userPostDummy.postDate}</span></div>

            {/* TODO: make it dynamic based if user logged in or not */}
        </div>
            <ElipsisMenu width={40} height={40} placement="leftStart" menuOptions={menu} isLoading={isLoading} />
        </div>
        <div className={classes.commentBorder}>
            <p className={classes.commentSection}>{userPostDummy.comment}</p>
        </div>
    </div>
  );

  return (
    <div className={classes.container}>
      <Modal backdrop="static" role="alertdialog" open={showModal} onClose={closeModal} size="xs">
        <Modal.Body>
          <p>Are you sure you want to delete this comment?</p>
        </Modal.Body>
        <Modal.Footer>
          <ButtonSpinner
            onClick={deleteComment}
            color="red"
            type={'button'}
            appearance="primary"
            label={'Delete Comment'}
            isLoading={isLoading}
            disabled={isLoading}
            size="sm"
          />
          <Button disabled={isLoading} size="sm" onClick={closeModal} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {renderHeading()}
      {/* <div className={classes.content}>
        <p>{userPostDummy.comment}</p>
      </div> */}
    </div>
  );
};

export default ViewComment;
