import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';
import {baseUrl} from '../../constants/api';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: headers => {
    headers.set('Accept', 'application/json');
    // TODO set token to header
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
