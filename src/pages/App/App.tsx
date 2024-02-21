import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import publicRoutes from "src/routes/route.public";
import authRoutes from "routes/route.auth";

import ErrorBoundary from "components/ErrorBoundary";
import MainLayout from "components/Layout/MainLayout";
import ClientLayout from "components/Layout/ClientLayout";
import NotFoundPage from "components/NotFoundPage";
// import PrivateRoutes from "components/PrivateRoutes/PrivateRoutes";
import { DEFAULT, UPLOAD_BRDC } from "routes/route.constant";

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
        {/* <Route element={<PrivateRoutes />}> */}
        <Route element={<MainLayout />}>
          <Route path={DEFAULT} element={<Navigate to={UPLOAD_BRDC} />} />
          {authRoutes.map(({ path, element }) => {
            const Element: FC = element;
            return <Route key={path} path={path} element={<Element />} />;
          })}
        </Route>
        {/* </Route> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
