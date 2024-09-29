import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/query/react';
import {baseUrl} from '../../constants/api';
import {authCheckApiResponse} from '../../utils/authCheckApiResponse';
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

const logResponse = <T>(response: {data?: T}, api: BaseQueryApi) => {
  // Auth check
  authCheckApiResponse(response, api);

  return response;
};

const baseQueryWithRetry = retry(baseQuery, {
  maxRetries: 3,
});

export const apiSlice = createApi({
  reducerPath: 'splitApi',
  // baseQuery: baseQueryWithRetry,
  baseQuery: async (args: any, api, extraOptions) => {
    const result = await baseQueryWithRetry(args, api, extraOptions);
    logResponse(result, api);
    return result;
  },
  tagTypes: [],
  endpoints: () => ({}),
});
