import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AfterAuthHomePage } from "./components/AfterAuthHomePage/AfterAuthHomePage";
import { AuthPage } from "./components/AuthPage/AuthPage";
import { UnfoundPage } from "./components/UnfoundPage";
import { Layout } from "./components/Layout/Layout";
import { useTypedSelector } from "./hooks/redux";
import { RoutesName } from "./utils/routes";

export const AppRouter = () => {
  const { isAuth } = useTypedSelector((state) => state.authManager);
  return (
    <Routes>
      <Route element={<Layout />}>
        {!isAuth && (
          <Route
            path={RoutesName.HOME_PAGE_ROUTE}
            element={<Navigate to={RoutesName.LOGIN_ROUTE} />}
          />
        )}
        {isAuth && (
          <Route
            path={RoutesName.HOME_PAGE_ROUTE}
            element={<AfterAuthHomePage />}
          />
        )}
        {!isAuth && (
          <>
            <Route path={RoutesName.LOGIN_ROUTE} element={<AuthPage />} />
            <Route path={RoutesName.SIGNUP_ROUTE} element={<AuthPage />} />
          </>
        )}
      </Route>
      <Route path="*" element={<UnfoundPage />} />
    </Routes>
  );
};
