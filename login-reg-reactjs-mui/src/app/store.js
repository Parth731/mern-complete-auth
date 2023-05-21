import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { UserAuthApi } from '../services/UserAuthApi';
import userReducer from '../features/userSlice';
import authReducer from '../features/authSlice';
import thunk from 'redux-thunk';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

/* store session storage  */
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
// const persistConfig = {
//   key: 'root',
//   storage: storageSession,
// }

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  [UserAuthApi.reducerPath]: UserAuthApi.reducer,
  userInfo: userReducer,
  authInfo: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(UserAuthApi.middleware),
  // middleware: [thunk],
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export const persistor = persistStore(store);
