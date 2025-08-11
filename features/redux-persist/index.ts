import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Features
import counterReducer from '@/features/counter/counterSlice';

// Root reducer where all reducers will be combined
const rootReducer = combineReducers({
  counter: counterReducer,
});

// setup storage for reducers.  Whitelist should specify which reducers to persist.
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['counter'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app for type-safe dispatching
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
