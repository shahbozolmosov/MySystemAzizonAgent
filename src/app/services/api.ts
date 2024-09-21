import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';
import {baseUrl} from '../../constants/api';
import {RootState} from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, {getState}) => {
    headers.set('Accept', 'application/json');
    // Access token
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
  credentials: 'same-origin',
});

const baseQueryWithRetry = retry(baseQuery, {
  maxRetries: 3,
});

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: [],
  endpoints: () => ({}),
});
