import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';

export const dcomApi = createApi({
  reducerPath: 'dcomApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dcom-native-interview.s3.amazonaws.com/api/merchant/query/',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: builder => ({
    fetchMerchants: builder.query<any, string>({
      query: address => address,
    }),
  }),
});

export const { useFetchMerchantsQuery } = dcomApi;
