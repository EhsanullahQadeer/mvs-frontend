/*************************************************************************
 * @file store.ts
 * @author Zohaib Ahmed
 * @desc Configures and exports the Redux store with middleware and persistence.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import { createStore, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/* LOCAL IMPORTS */
import rootReducer from './reducers';
import { RootState } from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'sounds', 'breadcrumb'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const middleware = [thunk];

const store: Store<RootState> = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

const persistor: Persistor = persistStore(store);

export { store, persistor };
