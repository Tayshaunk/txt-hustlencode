import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';
import { getProfileImage } from 'util/profile.util';
import classes from './CreatePostModule.module.scss';

/**
 * This component renders a box that users
 * can click on to navigate to the create post
 * page
 * @returns 
 */
const CreatePostModule = () => {
  // get react router dom navigate
  const navigate = useNavigate();
  // get current user
  const user = useAppSelector(getUser);

  // go to create post page
  const navToEditor = () => navigate(`/create-post`);

  return (
    <div className={classes.header} onClick={navToEditor}>
      <div className={classes.imgContainer}>
        {user ? (
          <img src={getProfileImage(user.profileImg, user.gender)} alt={`${user.name} profile thumbnail`} />
        ) : (
          <img src="https://hustlencode.s3.us-west-1.amazonaws.com/unspecified.jpg" alt="profile thumbnail" />
        )}
      </div>
      <div className={classes.nameContainer}>
        <div className={classes.name}>
          <p>What's on your mind?</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModule;
