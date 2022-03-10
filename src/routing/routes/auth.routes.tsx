import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DelayedFallback from 'components/DelayedFallback/DelayedFallback';
import Profile from 'pages/Profile/Profile';
import EditPost from 'pages/EditPost/EditPost';
import Aux from 'components/_Aux/_Aux';
import NavBar from 'components/NavBar/NavBar';
import ScrollToTop from 'components/Scroll/ScrollToTop';
import CreatePost from 'pages/CreatePost/CreatePost';
import EditProfileModule from 'pages/EditProfileAbout/EditProfileAbout';
import { AsyncCreatePost, AsyncEditPost, AsyncEditProfileModulePage } from 'routing/imports/RouteLazy';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';
/**
 * Public routes that are not protected
 * @returns React element
 */
const AuthRoutes = () => {
  const user = useAppSelector(getUser);
  return (
    <Aux>
      <ScrollToTop />
      <NavBar />
      <Routes>
        {/* renders users profile page  */}
        <Route
          path={'/:username'}
          element={
            <Suspense fallback={<DelayedFallback delay={250} />}>
              <Profile />
            </Suspense>
          }
        />

        <Route
          path={'/:username/profile/about/edit'}
          element={
            <Suspense fallback={<DelayedFallback delay={250} />}>
              <AsyncEditProfileModulePage />
            </Suspense>
          }
        />

        <Route
          path={'/:username/posts/:id/edit'}
          element={
            <Suspense fallback={<DelayedFallback delay={250} />}>
              <AsyncEditPost />
            </Suspense>
          }
        />

        <Route
          path={'/:username/create-post'}
          element={
            <Suspense fallback={<DelayedFallback delay={250} />}>
              <AsyncCreatePost />
            </Suspense>
          }
        />

        <Route path="/" element={<Aux>{user ? <Navigate to={`${user.username}`}></Navigate> : <div />}</Aux>} />
      </Routes>
    </Aux>
  );
};

export default AuthRoutes;
