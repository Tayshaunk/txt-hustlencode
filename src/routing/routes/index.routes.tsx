import Login from 'pages/auth_pages/Login/Login';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DelayedFallback from 'components/DelayedFallback/DelayedFallback';
import ForgotPassword from 'pages/auth_pages/ForgotPassword/ForgotPassword';

/**
 * Public routes that are not protected
 * @returns React element
 */
const PublicRoutes = () => {
  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <Suspense fallback={<DelayedFallback theme="dark" fullscreen={true} delay={250} />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path={'/forgot-password'}
        element={
          <Suspense fallback={<DelayedFallback theme="dark" fullscreen={true} delay={250} />}>
            <ForgotPassword />
          </Suspense>
        }
      />

      <Route
        path={'/forgot-password/:token'}
        element={
          <Suspense fallback={<DelayedFallback theme="dark" fullscreen={true} delay={250} />}>
            <ForgotPassword />
          </Suspense>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default PublicRoutes;
