import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Aux from 'components/_Aux/_Aux';
import NavBar from 'components/NavBar/NavBar';
import {
  AsyncCreatePost,
  AsyncEditPost,
  AsyncEditProfileAboutModulePage,
  AsyncEditProfileGeneralPage,
  AsyncEditProfileInterestsModulePage,
  AsyncEditProfileLayoutPage,
  AsyncEditProfilePage,
  AsyncEditProfilePasswordPage,
  AsyncEditProfileUsernamePage,
  AsyncProfileAboutPage,
  AsyncProfilePage,
  AsyncProfilePostsPage,
} from 'routing/imports/RouteLazy';
import Explore from 'pages/Explore/Explore';
import useScrollToTop from 'hooks/shared/useScrollToTop';
import NotFound from 'components/NotFound/NotFound';
import PageLoader from 'components/PageLoader/PageLoader';
import useLocalStorage from 'use-local-storage';
/**
 * Public routes that are not protected
 * @returns React element
 */
const AuthRoutes = () => {
  // scroll to top of the page route changes
  useScrollToTop();

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'light' : 'dark');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
  };

  return (
    <Aux data-theme={theme}>
      {/* <ScrollToTop /> */}
      <NavBar />
      <Routes>
        {/* renders explore feed  */}
        <Route
          index
          element={
            <Suspense
              fallback={
                <PageLoader
                  style={{ height: '100vh', width: '100vw' }}
                  theme="dark"
                  fullscreen={false}
                  isVisible={true}
                />
              }
            >
              <Explore />
            </Suspense>
          }
        />

        {/* renders create post page  */}
        <Route
          path={'create-post'}
          element={
            <Suspense
              fallback={
                <PageLoader
                  style={{ height: '100vh', width: '100vw' }}
                  theme="dark"
                  fullscreen={false}
                  isVisible={true}
                />
              }
            >
              <AsyncCreatePost />
            </Suspense>
          }
        />

        {/* renders user profile overview with tab navigation */}
        <Route
          path={'user'}
          element={
            <Suspense
              fallback={
                <PageLoader
                  style={{ height: '100vh', width: '100vw' }}
                  theme="dark"
                  fullscreen={false}
                  isVisible={true}
                />
              }
            >
              <AsyncProfilePage />
            </Suspense>
          }
        >
          {/* renders profile about section */}
          <Route
            path=":username"
            element={
              <Suspense
                fallback={
                  <PageLoader
                    style={{ height: '100vh', width: '100vw' }}
                    theme="light"
                    fullscreen={false}
                    isVisible={true}
                  />
                }
              >
                <AsyncProfileAboutPage />
              </Suspense>
            }
          />

          {/* renders profile posts section */}
          <Route
            path={':username/posts'}
            element={
              <Suspense
                fallback={
                  <PageLoader
                    style={{ height: '100vh', width: '100vw' }}
                    theme="light"
                    fullscreen={false}
                    isVisible={true}
                  />
                }
              >
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
            <Suspense
              fallback={
                <PageLoader
                  style={{ height: '100vh', width: '100vw' }}
                  theme="dark"
                  fullscreen={false}
                  isVisible={true}
                />
              }
            >
              <AsyncEditProfilePage />
            </Suspense>
          }
        >
          {/* renders page to edit username */}
          <Route
            index
            element={
              <Suspense
                fallback={
                  <PageLoader
                    style={{ height: '100vh', width: '100vw' }}
                    theme="light"
                    fullscreen={false}
                    isVisible={true}
                  />
                }
              >
                <AsyncEditProfileUsernamePage />
              </Suspense>
            }
          />

          {/* renders page to edit profile general info */}
          <Route
            path="profile"
            element={
              <Suspense
                fallback={
                  <PageLoader
                    style={{ height: '100vh', width: '100vw' }}
                    theme="light"
                    fullscreen={false}
                    isVisible={true}
                  />
                }
              >
                <AsyncEditProfileGeneralPage />
              </Suspense>
            }
          />

          {/* renders page to edit profile password*/}
          <Route
            path="password"
            element={
              <Suspense
                fallback={
                  <PageLoader
                    style={{ height: '100vh', width: '100vw' }}
                    theme="light"
                    fullscreen={false}
                    isVisible={true}
                  />
                }
              >
                <AsyncEditProfilePasswordPage />
              </Suspense>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path={'edit/profile/about'}
          element={
            <Suspense
              fallback={
                <PageLoader
                  style={{ height: '100vh', width: '100vw' }}
                  theme="dark"
                  fullscreen={false}
                  isVisible={true}
                />
              }
            >
              <AsyncEditProfileAboutModulePage />
            </Suspense>
          }
        />

        <Route
          path={'edit/profile/interests'}
          element={
            <Suspense
              fallback={
                <PageLoader
                  style={{ height: '100vh', width: '100vw' }}
                  theme="dark"
                  fullscreen={false}
                  isVisible={true}
                />
              }
            >
              <AsyncEditProfileInterestsModulePage />
            </Suspense>
          }
        />

        <Route
          path={'edit/profile/layout'}
          element={
            <Suspense
              fallback={
                <PageLoader
                  style={{ height: '100vh', width: '100vw' }}
                  theme="dark"
                  fullscreen={false}
                  isVisible={true}
                />
              }
            >
              <AsyncEditProfileLayoutPage />
            </Suspense>
          }
        />

        <Route
          path={'edit/post/:id'}
          element={
            <Suspense
              fallback={
                <PageLoader
                  style={{ height: '100vh', width: '100vw' }}
                  theme="dark"
                  fullscreen={false}
                  isVisible={true}
                />
              }
            >
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
