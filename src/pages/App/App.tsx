import React, { FC, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import publicRoutes from "src/routes/route.public";
import authRoutes from "routes/route.auth";

import ErrorBoundary from "components/ErrorBoundary";
// import MainLayout from "components/Layout/MainLayout";
import ClientLayout from "components/Layout/ClientLayout";
import NotFoundPage from "components/NotFoundPage";
import PrivateRoutes from "components/PrivateRoutes";
import { AGENT_PAGE, DEFAULT } from "routes/route.constant";

const MainLayout = lazy(() => import("components/Layout/MainLayout"));

const App: FC = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<ClientLayout />}>
          {publicRoutes.map(({ path, element }) => {
            const Element: FC = element;
            return <Route key={path} path={path} element={<Element />} />;
          })}
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route element={<MainLayout />}>
            <Route path={DEFAULT} element={<Navigate to={AGENT_PAGE} />} />
            {authRoutes.map(({ path, element }) => {
              // const Element: FC = element;
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      {React.createElement(element)}
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
