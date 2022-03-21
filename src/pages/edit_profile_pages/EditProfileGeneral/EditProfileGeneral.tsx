import { updateUserProfileCoverImageApi, updateUserProfileImageApi } from 'api/account.api';
import UploadCoverImage from 'components/ImageUpload/UploadCoverImage/UploadCoverImage';
import UploadProfileImage from 'components/ImageUpload/UploadProfileImage/UploadProfileImage';
import PageLoader from 'components/PageLoader/PageLoader';
import Aux from 'components/_Aux/_Aux';
import { IServerResponse } from 'interfaces/server.interface';
import { IHustlencodeUser } from 'interfaces/user.interface';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUser, setUser } from 'store/slices/userSessionSlice';
import { getProfileCoverImage, getProfileImage } from 'util/profile.util';
import EditProfileGeneralForm from './components/EditProfileGeneralForm/EditProfileGeneralForm';
// styles
import classes from './EditProfileGeneral.module.scss';

/**
 * Render form where user can update their username
 * @returns
 */
const EditProfileGeneral = () => {
  // get current user data
  const user = useAppSelector(getUser);

  const dispatch = useAppDispatch();

  /**
   * Makes api request to update the profile image
   * @param payload
   * @param id
   * @returns
   */
  const updateProfileImage = async (payload: any) => {
    // make server request
    const response: IServerResponse = await updateUserProfileImageApi(payload);

    const updatedUser: IHustlencodeUser = response.payload;
    // updatedUser.profileImg = `${updatedUser.profileImg}?${new Date().getTime()}`;

    // update user session data
    dispatch(setUser(updatedUser));
    // return response
    return Promise.resolve(response);
  };

  /**
   * Makes api request to update the profile image
   * @param payload
   * @param id
   * @returns
   */
  const updateProfileCoverImage = async (payload: any) => {
    // make server request
    const response: IServerResponse = await updateUserProfileCoverImageApi(payload);

    const updatedUser: IHustlencodeUser = response.payload;
    // updatedUser.coverImg = `${updatedUser.coverImg}?${new Date().getTime()}`;

    // update user session data
    dispatch(setUser(updatedUser));
    // return response
    return Promise.resolve(response);
  };

  const renderContent = (user: IHustlencodeUser) => (
    <div className={classes.contentWrapper}>
      <div className={classes.section}>
        <h3>Profile Information</h3>
        <EditProfileGeneralForm />
      </div>
      <div className={classes.section}>
        <h3>Profile Image</h3>
        <UploadProfileImage image={getProfileImage(user.profileImg, user.gender)} uploadImageApi={updateProfileImage} />
      </div>

      <div className={classes.section}>
        <h3>Cover Image</h3>
        <UploadCoverImage image={getProfileCoverImage(user.coverImg)} uploadImageApi={updateProfileCoverImage} />
      </div>
    </div>
  );
  return <Aux>{user ? renderContent(user) : <PageLoader isVisible={false} fullscreen={false} theme={'light'} />}</Aux>;
};

export default EditProfileGeneral;
