export interface Shop {
  id: number;
  name: string;
  logo: string;
  link: string;
  ratings: Rating;
  priceRating: number;
  location: Address;
  cuisines: string[];
}

export interface Rating {
  overall: number;
  star: number;
  num: number;
}

export interface Address {
  street: string;
  state: string;
  zip: string;
}
