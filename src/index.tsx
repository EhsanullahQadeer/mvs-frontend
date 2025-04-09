// @ts-ignore */
import React from 'react';
import ReactDOM from 'react-dom/client';
import Application from './application';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import './assets/css/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Application />
    </PersistGate>
  </Provider>
);
