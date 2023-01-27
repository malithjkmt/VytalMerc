import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { dcomApi } from '../services/api/dcomApi';
import searchQueryReducer from './searchQuerySlice';

const getPersistConfig = (reducerName: string) => {
  return {
    key: `redux_offline_store/${reducerName}`,
    storage: AsyncStorage,
  };
};

const assembleMiddleware = () => {
  console.log('assembling middleware...');
  const middleware = [dcomApi.middleware];

  if (__DEV__) {
    /* ------------- Redux Logger Middleware ------------- */
    // Note: logger must be the last middleware in chain,
    // otherwise it will log thunk and promise, not actual actions.
    const { createLogger } = require('redux-logger');

    const logger = createLogger({
      collapsed: true,
      duration: true,
      diff: true,
    });

    middleware.push(logger);
  } else {
    // Removing prod console logs
    function noop() { }
    console.log = noop;
    console.warn = noop;
    console.error = noop;
  }

  return middleware;
};

const rootReducer = combineReducers({
  [dcomApi.reducerPath]: dcomApi.reducer,
  searchQuery: searchQueryReducer,
});

export const store = configureStore({
  reducer: persistReducer(getPersistConfig('root'), rootReducer),
  // Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(assembleMiddleware()),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
