import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./Slices/userSlice";
// persist store
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'user-state',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
      user: persistedReducer
  },
});

export const persistor = persistStore(store);