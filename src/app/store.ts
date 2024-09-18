import {configureStore, ConfigureStoreOptions} from '@reduxjs/toolkit';
import {api} from './services/api';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined,
) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(api.middleware),
    ...options,
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export const useTypesSelector: TypedUseSelectorHook<RootState> = useSelector;
