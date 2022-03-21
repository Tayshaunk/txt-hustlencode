// styles
import classes from './CropModal.module.scss';
import React, { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import { Button, Modal } from 'rsuite';
import ButtonLoader from 'components/Buttons/ButtonSpinner/ButtonSpinner';

/**
 * Modal that contains the crop tool
 */
interface ICropModalProps {
  show: boolean; // tracks visibility of modal
  imageData: string; // image to edit
  overflow: boolean;
  cropMaxWidth: number;
  cropMinWidth: number;
  cropConfigObj: any;
  size: 'xs' | 'sm' | 'md' | 'lg';
  setShow: (show: boolean) => void;
  setImageData: (d: any) => void;
}

/**
 *
 * @param ICropModalProps
 * @returns
 */
const CropModal = (props: ICropModalProps) => {
  const { cropConfigObj, cropMaxWidth, cropMinWidth, size, show, imageData, overflow, setShow, setImageData } = props;

  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [cropConfig, setCropConfig] = useState<any>(cropConfigObj); // settings for crop tool
  const [originalCropImage, setOriginalCropImage] = useState<HTMLImageElement | null>(null); // holds current crop image state
  const [croppedImage, setCroppedImage] = useState<string | null>(null); // holds cropped image data

  /**
   * Resets thw crop config settings and image state
   * @param img
   * @returns
   */
  const onImageLoaded = (img: HTMLImageElement) => {
    setOriginalCropImage(img);
  };

  const applyCrop = () => {
    // update editor with cropped image
    setImageData(croppedImage);

    // hide cropper modal
    setShow(false);
  };

  /**
   * Apply crop to the image
   * @param crop
   * @param percentageCrop
   */
  const makeClientCrop = async (crop: Crop) => {
    // check if we have an image and a crop width/height that are both higher than zero
    if (originalCropImage && crop.width && crop.height) {
      setIsCropping(true);
      // get crop result in base 64
      const croppedImage = await getCroppedImg(originalCropImage, crop);
      // store its value
      setCroppedImage(croppedImage);
      setIsCropping(false);
    }
  };

  /**
   * Creates canvas element and returns canvas context
   * @param crop Crop config info
   * @returns
   */
  const getCanvas = (crop: Crop): HTMLCanvasElement => {
    // create canvas which will be used to crop image
    const canvas: HTMLCanvasElement = document.createElement('canvas');

    canvas.width = crop.width;
    canvas.height = crop.height;

    // get canvas context; this lets use draw on the cranvas
    return canvas;
  };

  /**
   * Returns base64 image
   * @param image image element
   * @param crop react crop
   * @param fileName
   * @returns
   */
  const getCroppedImg = (image: HTMLImageElement, crop: Crop): Promise<string | null> => {
    // get canvas
    const canvas: HTMLCanvasElement = getCanvas(crop);

    // get canvas context; may be null
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (ctx) {
      const pixelRatio = window.devicePixelRatio;
      // get image ratios
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = crop.width * pixelRatio * scaleX;
      canvas.height = crop.height * pixelRatio * scaleY;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = 'high';

      // draw image on canvas with crop edits
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
      );

      // return base 64 img
      // @ts-ignore
      return canvas.toDataURL('image/jpeg');
    }

    return Promise.resolve(null);
  };

  return (
    <Modal size={size} backdrop="static" overflow={overflow} open={show} onClose={() => setShow(false)}>
      <Modal.Header>
        <Modal.Title>Crop Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={classes.CropContainer}>
          <p style={{ margin: '2px auto 2px auto', textAlign: 'left' }}>Please select the area you wish to crop.</p>
          <p style={{ margin: '2px auto 2px auto', textAlign: 'left' }}>
            {' '}
            You can use your mouse to crop the image below.
          </p>
          <p style={{ margin: '2px auto 2px auto', textAlign: 'left' }}>On mobile you can use your fingers.</p>

          <div className={classes.cropperContainer}>
            <ReactCrop
              onImageLoaded={onImageLoaded}
              className={classes.Cropper}
              src={imageData}
              crop={cropConfig}
              ruleOfThirds
              circularCrop={false}
              onChange={(newCrop: any) => setCropConfig(newCrop)}
              onComplete={makeClientCrop}
              maxWidth={cropMaxWidth}
              minWidth={cropMinWidth}
              crossorigin="anonymous"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonLoader
          className=""
          isLoading={isCropping}
          type="button"
          label="Apply Changes"
          onClick={applyCrop}
          appearance="primary"
          disabled={cropConfig === cropConfigObj}
        />
        <Button
          onClick={() => {
            setShow(false);
          }}
          appearance="subtle"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CropModal;
