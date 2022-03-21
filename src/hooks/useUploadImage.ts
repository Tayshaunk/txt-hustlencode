import { IServerResponse } from 'interfaces/server.interface';
import { useRef, useState } from 'react';
import { serverErrorHandler } from 'services/server-error.service';
import { openErrorToaster, openSuccessToaster } from 'services/toast.service';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/slices/userSessionSlice';

export default function useUploadImage(
  currentImage: string,
  uploadImageApi: (f: FormData) => Promise<IServerResponse>,
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  // ref element upload
  const inputFile = useRef<HTMLInputElement>(null);

  // shows/hides modal with crop tool
  const [show, setShow] = useState(false);

  // shows loader
  const [loadingPreview, setLoadingPreview] = useState(false);

  const dispatch = useAppDispatch();

  const logoutHandler = () => dispatch(logout());

  /**
   * Updates the image in the preview
   * The first selected image in the file list is
   * selected and processed
   *
   * @todo
   * 1. Add validation for file selection. Only
   * allow common image file types.
   * .png, .jpg, .jpeg, .webp, .gif, .tif, .heic
   *
   * @param e The file input event object
   */
  const onSelectImage = (e: any) => {
    // process files if they exist
    if (e.target.files && e.target.files.length > 0) {
      setLoadingPreview(true); // show spinner

      const reader = new FileReader();

      // updates the image preview file
      reader.addEventListener('load', () => {
        setSelectedImage(reader.result);
        setLoadingPreview(false); // hide spinner
      });

      // process first file in list
      reader.readAsDataURL(e.target.files[0]);
    }

    // clear file input field
    e.target.value = '';
  };

  /**
   * Updates the image in the preview and the image value
   * in form state
   * @param data
   */
  const updateImage = (data: any) => {
    setSelectedImage(data);
  };

  const uploadImage = async () => {
    try {
      // verify that form is valid
      if (currentImage !== selectedImage) {
        // show spinner
        setIsLoading(true);

        // Form data payload for creating txter
        const formData = new FormData();

        // convert base64 image to Blob
        const blobRes = await fetch(selectedImage);
        const blob = await blobRes.blob();

        // add image blob to key pairs
        formData.append('file', blob);

        // make server request - the upload method is passed to hook
        const response: IServerResponse = await uploadImageApi(formData);

        // show success message
        openSuccessToaster(response.message, 3500);

        // clear selected image
        setSelectedImage(null);

        // hide spinner
        setIsLoading(false);
      } else {
        openErrorToaster('Please select an image first.', 3000);
      }
    } catch (e) {
      // hide spinner
      setIsLoading(false);
      serverErrorHandler(e, logoutHandler);
    }
  };

  return {
    selectedImage,
    inputFile,
    show,
    loadingPreview,
    isLoading,
    updateImage,
    onSelectImage,
    setSelectedImage,
    setShow,
    setLoadingPreview,
    uploadImage,
  };
}
