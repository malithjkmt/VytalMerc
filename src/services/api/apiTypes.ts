import { Shop, Rating, Address } from '../../utils/types';

export interface ResponseDTO {
  merchants: ShopDTO[];
}

export interface ShopDTO {
  id: number;
  name: string;
  logo_url: string;
  url: linkDTO;
  ratings: RatingDTO;
  price_rating: number;
  location: AddressDTO;
  cuisines: string[];
}

export interface linkDTO {
  complete: string;
}

export interface RatingDTO {
  overall_rating: number;
  star_rating: number;
  num_ratings: number;
}

export interface AddressDTO {
  street: string;
  state: string;
  zip: string;
}

export const getShopFromShopDTO = ({
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
