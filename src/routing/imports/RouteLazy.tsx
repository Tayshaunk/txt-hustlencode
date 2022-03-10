import React from 'react';

/**
 * Lazy import component for page to edit profile modules
 */
export const AsyncEditProfileModulePage = React.lazy(() => {
  return import('pages/EditProfileAbout/EditProfileAbout');
});


/**
 * Lazy import component for page to edit posts
 */
 export const AsyncEditPost = React.lazy(() => {
  return import('pages/EditPost/EditPost');
});


/**
 * Lazy import component for page to create posts
 */
 export const AsyncCreatePost = React.lazy(() => {
  return import('pages/CreatePost/CreatePost');
});
