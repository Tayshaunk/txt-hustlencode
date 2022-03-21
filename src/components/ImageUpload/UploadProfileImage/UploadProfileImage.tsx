// styles
import classes from './UploadProfileImage.module.scss';

import React from 'react';
import { faCamera, faRemove, faSpinner, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'rsuite';
import CustomTooltip from 'components/Tooltip/CustomTooltip';
import CropModal from '../CropModal/CropModal';
import Aux from 'components/_Aux/_Aux';
import useUploadImage from 'hooks/useUploadImage';
import { IServerResponse } from 'interfaces/server.interface';
import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';

interface IProps {
  image: any; // current profile image
  uploadImageApi: (f: FormData) => Promise<IServerResponse>; // async method for uploading image
}

/**
 * This components renders a container with the users
 * current profile image. Users can click on the edit button, in order
 * to select a new profile image for upload
 * @param props
 * @returns
 */
const UploadProfileImage = (props: IProps) => {
  const { image, uploadImageApi } = props;

  // get editor state
  const editor = useUploadImage(image, uploadImageApi);

  /**
   * Renders users current profile image
   * @returns
   */
  const renderCurrentProfileImage = () => (
    <Aux>
      <div className={classes.imgContainer}>
        <img src={image} alt="profile" />
      </div>
      {renderImageSelectBtn()}
    </Aux>
  );

  /**
   * Renders image selected by the user
   * @returns
   */
  const renderSelectedImage = () => (
    <Aux>
      <div className={classes.imgContainer}>
        <img src={editor.selectedImage} alt="profile" />
      </div>

      <CustomTooltip msg="Remove selected picture" className={classes.imageRemoveBtn} placement="bottom">
        <button type="button" onClick={() => editor.setSelectedImage(null)}>
          {editor.loadingPreview ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faRemove} />}
        </button>
      </CustomTooltip>

      <div className={classes.imageEditBtnContainer}>
        <Button color="blue" appearance="primary" onClick={() => editor.setShow(true)}>
          <p>Edit image</p>
        </Button>

        <ButtonSpinner
          color="green"
          type={'button'}
          label={'Confirm'}
          isLoading={editor.isLoading}
          disabled={editor.isLoading}
          appearance="primary"
          onClick={() => {
            editor.uploadImage();
          }}
        />
      </div>
    </Aux>
  );
  /**
   * Renders the button that allows users
   * to select a new profile image
   * @returns
   */
  const renderImageSelectBtn = () => (
    <CustomTooltip msg="Select a picture" className={classes.fileUploadInput} placement="bottom">
      <button type="button" onClick={() => editor?.inputFile?.current?.click()}>
        <input
          type="file"
          ref={editor.inputFile}
          style={{ display: 'none' }}
          onChange={editor.onSelectImage}
          accept="image/*"
        />
        {editor.loadingPreview ? <FontAwesomeIcon icon={faSyncAlt} spin /> : <FontAwesomeIcon icon={faCamera} />}
      </button>
    </CustomTooltip>
  );
  return (
    <div className={classes.preview}>
      {/* render modal that allows users to crop their image */}
      <CropModal
        cropConfigObj={{
          unit: 'px',
          width: 50,
          aspect: 1,
        }}
        cropMinWidth={100}
        cropMaxWidth={300}
        size="lg"
        overflow={false}
        imageData={editor.selectedImage}
        show={editor.show}
        setShow={editor.setShow}
        setImageData={editor.updateImage}
      />

      {/* render image preview */}
      {editor.selectedImage ? renderSelectedImage() : renderCurrentProfileImage()}
    </div>
  );
};

export default UploadProfileImage;
