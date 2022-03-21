import IsAuthed from 'components/IsAuthed/IsAuthed';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import { NavLink } from 'react-router-dom';
import { getProfileCoverImage } from 'util/profile.util';

// styles
import classes from './Cover.module.scss';

interface IProps {
  coverImage: string | null; // url for the cover image
  profileImage: string | null; // url for the profile image
  name: string;
  gender: Gender;
  username: string;
}

/**
 * Renders a view with a welcome message and Login
 * Form. Users are able to sign in with their credentials
 * @returns
 */
const Profile = (props: IProps) => {
  const { coverImage, profileImage, name, gender, username } = props;

  return (
    <div className={classes.container}>
      <div className={classes.coverImageContainer}>
        {coverImage ? (
          <img className={classes.coverImage} src={getProfileCoverImage(coverImage)} alt="profile cover" />
        ) : null}
      </div>

      <div className={classes.details}>
        <div className={classes.content}>
          <div className={classes.profileImageContainer}>
            <ProfileImage gender={gender} url={profileImage} />
          </div>
          <div className={classes.nameContainer}>
            <h1>{name}</h1>
            <p>{username}</p>
          </div>
        </div>
        <IsAuthed type="username" value={username}>
          <div className={classes.actions}>
            <NavLink to="/account">Edit Profile</NavLink>
          </div>
        </IsAuthed>
      </div>
    </div>
  );
};

export default Profile;
