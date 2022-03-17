// image placeholders
import malePlaceholder from 'assets/placeholders/male.jpg';
import femalePlaceholder from 'assets/placeholders/female.jpg';
import unspecifiedPlaceholder from 'assets/placeholders/unspecified.jpg';

interface IProps {
  url: string | null;
  gender: string;
}

const ProfileImage = (props: IProps) => {
  const { url, gender } = props;

  /**
   * Returns profile image. If the custom url is not
   * provided, profile image placeholder is rendered
   * based on the users gender
   * @returns
   */
  const getProfileImage = () => {
    // handle male placeholder image
    if (url === 'assets/placeholders/male.jpg') return malePlaceholder;
    // handle female placeholder image
    if (url === 'assets/placeholders/female.jpg') return femalePlaceholder;
    // handle unspecified placeholder image
    if (url === 'assets/placeholders/unspecified.jpg') return unspecifiedPlaceholder;
    
    if(url) return url;

    if (!url && gender === 'male') return malePlaceholder;

    if (!url && gender === 'female') return femalePlaceholder;

    return unspecifiedPlaceholder;
  };

  return <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={getProfileImage()} alt="user profile" />;
};

export default ProfileImage;
