/*************************************************************************
 * @file index.tsx
 * @author Zohaib Ahmed
 * @desc Entry point for rendering the application.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

/* LOCAL IMPORTS */
import routes from './pages/routes';
import { store, persistor } from './redux/store';
import './assets/css/global.scss';
import { WebSocketProvider } from 'services/WebSocket/APIGatewayManager.context';


const Application: React.FunctionComponent<{}> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component name={route.name} {...props} {...route.props} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <WebSocketProvider>
        <Application />
      </WebSocketProvider>
    </PersistGate>
  </Provider>
);