import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { dcomApi } from '../services/api/dcomApi';
import searchQueryReducer from './searchQuerySlice';

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

export const store = configureStore({
  reducer: {
    [dcomApi.reducerPath]: dcomApi.reducer,
    searchQuery: searchQueryReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(assembleMiddleware()),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
