import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';
import { getProfileImage } from 'util/profile.util';
import classes from './CreatePostModule.module.scss';

const CreatePostModule = () => {
  const navigate = useNavigate();
  const user = useAppSelector(getUser);
  const navToEditor = () => {
    if (user) {
      const url = `/${user.username}/create-post`;
      navigate(url);
    }
  };

  return (
    <div className={classes.header} onClick={navToEditor}>
      <div className={classes.imgContainer}>
        {user ? (
          <img src={getProfileImage(user.profileImg)} alt={`${user.name} profile thumbnail`} />
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
