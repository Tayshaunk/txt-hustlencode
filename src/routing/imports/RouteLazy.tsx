import React from 'react';
/**
 * Lazy import component for page to edit profile about module
 */
export const AsyncEditProfileAboutModulePage = React.lazy(() => {
  return import('pages/code_editor_pages/EditProfileAbout/EditProfileAbout');
});

/**
 * Lazy import component for page to edit profile interest module
 */
export const AsyncEditProfileInterestsModulePage = React.lazy(() => {
  return import('pages/code_editor_pages/EditProfileInterests/EditProfileInterests');
});

/**
 * Lazy import component for page to edit posts
 */
export const AsyncEditPost = React.lazy(() => {
  return import('pages/code_editor_pages/EditPost/EditPost');
});

/**
 * Lazy import component for page to create posts
 */
export const AsyncCreatePost = React.lazy(() => {
  return import('pages/code_editor_pages/CreatePost/CreatePost');
});

/**
 * Lazy import component for profile page
 */
export const AsyncProfilePage = React.lazy(() => {
  return import('pages/profile_pages/Profile/Profile');
});

/**
 * Lazy import component for profile about page
 */
export const AsyncProfileAboutPage = React.lazy(() => {
  return import('pages/profile_pages/ProfileAbout/ProfileAbout');
});

/**
 * Lazy import component for profile posts page
 */
export const AsyncProfilePostsPage = React.lazy(() => {
  return import('pages/profile_pages/ProfilePosts/ProfilePosts');
});

/**
 * Lazy import component for edit profile page
 */
export const AsyncEditProfilePage = React.lazy(() => {
  return import('pages/edit_profile_pages/EditProfile/EditProfile');
});

/**
 * Lazy import component for edit profile username/email page
 */
export const AsyncEditProfileUsernamePage = React.lazy(() => {
  return import('pages/edit_profile_pages/EditProfileUsername/EditProfileUsername');
});

/**
 * Lazy import component for page that allows user to edit general profile info
 */
export const AsyncEditProfileGeneralPage = React.lazy(() => {
  return import('pages/edit_profile_pages/EditProfileGeneral/EditProfileGeneral');
});

/**
 * Lazy import component for edit profile username/email page
 */
export const AsyncEditProfilePasswordPage = React.lazy(() => {
  return import('pages/edit_profile_pages/EditProfilePassword/EditProfilePassword');
});

/**
 * Lazy import component for edit profile username/email page
 */
export const AsyncEditProfileLayoutPage = React.lazy(() => {
  return import('pages/code_editor_pages/EditProfileLayout/EditProfileLayout');
});
