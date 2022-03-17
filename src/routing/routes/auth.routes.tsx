import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import DelayedFallback from 'components/DelayedFallback/DelayedFallback';
import Aux from 'components/_Aux/_Aux';
import NavBar from 'components/NavBar/NavBar';
import {
  AsyncCreatePost,
  AsyncEditPost,
  AsyncEditProfileAboutModulePage,
  AsyncEditProfileGeneralPage,
  AsyncEditProfileInterestsModulePage,
  AsyncEditProfilePage,
  AsyncProfileAboutPage,
  AsyncProfilePage,
  AsyncProfilePostsPage,
} from 'routing/imports/RouteLazy';
import Explore from 'pages/Explore/Explore';
import useScrollToTop from 'hooks/useScrollToTop';
import NotFound from 'components/NotFound/NotFound';

/**
 * Public routes that are not protected
 * @returns React element
 */
const AuthRoutes = () => {
  // scroll to top of the page route changes
  useScrollToTop();

  return (
    <Aux>
      {/* <ScrollToTop /> */}
      <NavBar />
      <Routes>
        {/* renders explore feed  */}
        <Route
          index
          element={
            <Suspense fallback={<DelayedFallback theme="dark" fullscreen={true} delay={250} />}>
              <Explore />
            </Suspense>
          }
        />

        {/* renders create post page  */}
        <Route
          path={'create-post'}
          element={
            <Suspense fallback={<DelayedFallback theme="dark" fullscreen={true} delay={250} />}>
              <AsyncCreatePost />
            </Suspense>
          }
        />

        {/* renders user profile overview with tab navigation */}
        <Route
          path={'user'}
          element={
            <Suspense fallback={<DelayedFallback theme="dark" fullscreen={true} delay={250} />}>
              <AsyncProfilePage />
            </Suspense>
          }
        >
          {/* renders profile about section */}
          <Route
            path=":username"
            element={
              <Suspense fallback={<DelayedFallback theme="light" fullscreen={false} delay={250} />}>
                <AsyncProfileAboutPage />
              </Suspense>
            }
          />

          {/* renders profile posts section */}
          <Route
            path={':username/posts'}
            element={
              <Suspense fallback={<DelayedFallback theme="light" fullscreen={false} delay={250} />}>
                <AsyncProfilePostsPage />
              </Suspense>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* renders the edit profile page */}
        <Route
          path={'account'}
          element={
            <Suspense fallback={<DelayedFallback theme="dark" fullscreen={true} delay={250} />}>
              <AsyncEditProfilePage />
            </Suspense>
          }
        >
          {/* renders profile about section */}
          <Route
            index
            element={
              <Suspense fallback={<DelayedFallback theme="light" fullscreen={false} delay={250} />}>
                <AsyncEditProfileGeneralPage />
              </Suspense>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path={'edit/profile/about'}
          element={
            <Suspense fallback={<DelayedFallback theme="dark" fullscreen={true} delay={250} />}>
              <AsyncEditProfileAboutModulePage />
            </Suspense>
          }
        />

        <Route
          path={'edit/profile/interests'}
          element={
            <Suspense fallback={<DelayedFallback theme="dark" fullscreen={true} delay={250} />}>
              <AsyncEditProfileInterestsModulePage />
            </Suspense>
          }
        />

        <Route
          path={'edit/post/:id'}
          element={
            <Suspense fallback={<DelayedFallback theme="dark" fullscreen={true} delay={250} />}>
              <AsyncEditPost />
            </Suspense>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Aux>
  );
};

export default AuthRoutes;
