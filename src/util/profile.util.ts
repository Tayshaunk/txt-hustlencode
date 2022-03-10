/**
 * Returns the users profile image
 * @returns
 */
export const getProfileImage = (img: string | null): string => {
  if (img) {
    if (img === 'assets/placeholders/male.jpg') {
      // return unspecified
      return 'https://hustlencode.s3.us-west-1.amazonaws.com/male.jpg';
    }

    if (img === 'assets/placeholders/female.jpg') {
      // return unspecified
      return 'https://hustlencode.s3.us-west-1.amazonaws.com/female.jpg';
    }

    if (img === 'assets/placeholders/unspecified.jpg') {
      // return unspecified
      return 'https://hustlencode.s3.us-west-1.amazonaws.com/unspecified.jpg';
    }

    return img;
  }

  // return unspecified
  return 'https://hustlencode.s3.us-west-1.amazonaws.com/unspecified.jpg';
};
