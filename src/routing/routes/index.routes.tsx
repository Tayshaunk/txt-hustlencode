import Login from "pages/Login/Login";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DelayedFallback from "components/DelayedFallback/DelayedFallback";

/**
 * Public routes that are not protected
 * @returns React element
 */
const PublicRoutes = () => {

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <Suspense fallback={<DelayedFallback delay={250}/>}>
            <Login />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default PublicRoutes;
