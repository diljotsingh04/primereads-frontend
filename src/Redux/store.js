import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import userReducer from "./Slices/userSlice";
import balanceSlice from './Slices/balanceSlice';
import storage from 'redux-persist/lib/storage';
import themeSlice from './Slices/themeSlice';

const persistConfig = {
    key: 'user-state',
    storage,
};
const themepersistConfig = {
    key: 'theme-state',
    storage
}

const userpersistedReducer = persistReducer(persistConfig, userReducer);
const themepersistReducer = persistReducer(themepersistConfig, themeSlice)

export const store = configureStore({
    reducer: {
        user: userpersistedReducer,
        balance: balanceSlice,
        theme: themepersistReducer
    },
    
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);