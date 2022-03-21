import { getProfileImage } from "util/profile.util";

interface IProps {
  url: string | null;
  gender: Gender;
}

const ProfileImage = (props: IProps) => {
  const { url, gender } = props;

  return (
    <img
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      src={getProfileImage(url, gender)}
      alt="user profile"
    />
  );
};

export default ProfileImage;
