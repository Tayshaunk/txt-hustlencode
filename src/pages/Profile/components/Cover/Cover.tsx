import ProfileImage from 'components/ProfileImage/ProfileImage';
// styles
import classes from './Cover.module.scss';

interface IProps {
  coverImage: string | null; // url for the cover image
  profileImage: string | null; // url for the profile image
  name: string;
  gender: string;
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
        {coverImage ? <img className={classes.coverImage} src={coverImage} alt="profile cover" /> : null}
      </div>

      <div className={classes.details}>
        <div className={classes.profileImageContainer}>
          <ProfileImage gender={gender} url={profileImage} />
        </div>
        <div className={classes.nameContainer}>
          <h1>{name}</h1>
          <p>{username}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
