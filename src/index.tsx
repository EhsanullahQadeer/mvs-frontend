/*************************************************************************
 * @file index.tsx
 * @author Zohaib Ahmed
 * @desc Entry point for rendering the application.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

/* LOCAL IMPORTS */
import routes from "./pages/routes";
import { store, persistor } from "./redux/store";
import "./assets/css/global.scss";
import { WebSocketProvider } from "services/WebSocket/APIGatewayManager.context";
import NotFoundPage from "pages/NotFoundPage";
import publicRoutes from "routes/publicRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { initializeTokenRefresher, refreshTokenEvery } from "redux/actions/tokenrefresher.actions";
import { ToastProvider } from "shared/toasts/ToastProvider";
import { shouldRedirectToProfile } from "utils/authHandler";

const cleanupActivityRefresh = initializeTokenRefresher();

const RouteWrapper = ({ component: Component, path, ...rest }) => {
  const { shouldRedirect, username } = shouldRedirectToProfile(path);
  
  if (shouldRedirect && username) {
    return <Navigate to={`/profile/${username}`} replace />;
  }
  
  return <Component {...rest} />;
};

const renderRoutes = (routes: any[]) => {
  return routes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      element={
        <RouteWrapper 
          component={route.component} 
          path={route.path}
          name={route.name} 
          {...route.props} 
        />
      }
    >
      {route.children ? renderRoutes(route.children) : null}
    </Route>
  ));
};

const Application: React.FunctionComponent<{}> = (props) => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          {renderRoutes(routes)}
          {renderRoutes(publicRoutes)}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <WebSocketProvider>
        <Application />
        <ToastContainer />
      </WebSocketProvider>
    </PersistGate>
  </Provider>
);
