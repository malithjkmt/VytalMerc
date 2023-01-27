import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';

import { ResponseDTO, getShopFromShopDTO } from './apiTypes';

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
      transformResponse: (res: ResponseDTO) => {
        return res.merchants.map(shop => getShopFromShopDTO(shop));
      },
    }),
  }),
});

export const { useFetchMerchantsQuery } = dcomApi;
