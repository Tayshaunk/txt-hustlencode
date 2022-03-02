
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DelayedFallback from "components/DelayedFallback/DelayedFallback";
import Profile from "pages/Profile/Profile";


/**
 * Public routes that are not protected
 * @returns React element
 */
const AuthRoutes = () => {

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <Suspense fallback={<DelayedFallback delay={250}/>}>
              <Profile />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AuthRoutes;
