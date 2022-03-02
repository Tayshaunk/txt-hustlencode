import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DelayedFallback from 'components/DelayedFallback/DelayedFallback';
import Profile from 'pages/Profile/Profile';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';
import { IHustlencodeUser } from 'interfaces/user.interface';

/**
 * Public routes that are not protected
 * @returns React element
 */
const AuthRoutes = ({ user }: { user: IHustlencodeUser }) => {
  console.log(user);
  return (
    <Routes>
      <Route
        path={'/settings'}
        element={
          <Suspense fallback={<DelayedFallback delay={250} />}>
            <p>settings</p>
            <p>settings</p>
            <p>settings</p>
          </Suspense>
        }
      />

      <Route
        path={'/settings/lang'}
        element={
          <Suspense fallback={<DelayedFallback delay={250} />}>
            <p>lang</p>
            <p>lang</p>
            <p>lang</p>
            <p>lang</p>
          </Suspense>
        }
      />

      <Route
        path={'/:username'}
        element={
          <Suspense fallback={<DelayedFallback delay={250} />}>
            <Profile />
          </Suspense>
        }
      />

      <Route path="*" element={<Navigate to={`/${user.username}`} />} />
    </Routes>
  );
};

export default AuthRoutes;
