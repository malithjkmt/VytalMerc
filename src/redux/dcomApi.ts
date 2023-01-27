import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';

import { Shop, Rating, Address } from '../utils/types';

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

// TODO: move these to src/services/api/types

interface ResponseDTO {
  merchants: ShopDTO[];
}

interface ShopDTO {
  id: number;
  name: string;
  logo_url: string;
  url: linkDTO;
  ratings: RatingDTO;
  price_rating: number;
  location: AddressDTO;
  cuisines: string[];
}

interface linkDTO {
  complete: string;
}

interface RatingDTO {
  overall_rating: number;
  star_rating: number;
  num_ratings: number;
}

interface AddressDTO {
  street: string;
  state: string;
  zip: string;
}

const getShopFromShopDTO = ({
  id,
  name,
  logo_url,
  url,
  ratings,
  price_rating,
  location,
  cuisines,
}: ShopDTO): Shop => {
  return {
    id,
    name,
    logo: logo_url,
    link: url?.complete,
    ratings: getRatingFromRatingDTO(ratings),
    priceRating: price_rating,
    location: getAddressFromAddressDTO(location),
    cuisines,
  };
};

const getRatingFromRatingDTO = ({
  overall_rating,
  star_rating,
  num_ratings,
}: RatingDTO): Rating => {
  return {
    overall: overall_rating,
    star: star_rating,
    num: num_ratings,
  };
};

const getAddressFromAddressDTO = ({ street, state, zip }: AddressDTO): Address => {
  return { street, state, zip };
};

export const { useFetchMerchantsQuery } = dcomApi;
