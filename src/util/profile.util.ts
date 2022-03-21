/**
 * Returns the users profile image
 * @returns
 */
export const getProfileImage = (img: string | null, gender: Gender): string => {
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

  // return custom image
  if (img) return `${img}?${new Date().getTime()}`;

  // if no img; return default profile image for males
  if (!img && gender === 'male') return 'https://hustlencode.s3.us-west-1.amazonaws.com/male.jpg';

  // if no img; return default profile image for males
  if (!img && gender === 'female') return 'https://hustlencode.s3.us-west-1.amazonaws.com/female.jpg';

  // if no img; return default profile image for unspecified
  return 'https://hustlencode.s3.us-west-1.amazonaws.com/unspecified.jpg';
};

export const getProfileCoverImage = (img: string | null): string => {
  if (img) {
    if (img === 'assets/placeholders/cover-img.jpg') {
      // return default
      return 'https://hustlencode.s3.us-west-1.amazonaws.com/pexels-kevin-ku-577585.jpg';
    }

    // return custom image
    if (img) return `${img}?${new Date().getTime()}`;
  }

  // return default
  return 'https://hustlencode.s3.us-west-1.amazonaws.com/pexels-kevin-ku-577585.jpg';
};
