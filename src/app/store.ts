import {configureStore, ConfigureStoreOptions} from '@reduxjs/toolkit';
import {apiSlice} from './services/apiSlice.ts';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import authSlice from './services/auth/authSlice';
import orderSlice from './services/order/orderSlice';
import starterSlice from './services/starter/starterSlice.ts';

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined,
) =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      starter: starterSlice,
      auth: authSlice,
      productOrder: orderSlice,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    ...options,
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export const useTypesSelector: TypedUseSelectorHook<RootState> = useSelector;
