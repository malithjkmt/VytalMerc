// syntax: {street address}, {zip code}
// eg: 55 Water st 10041

export class ParsingError extends Error { }

export interface ParsedAddress {
  addressText: string;
  addressQuery: string;
}

export const COMMON_ADDRESS_VALIDATION_MESSAGE = 'Please enter a valid address with zip code';

export const parseAddressInput = (text: string): ParsedAddress => {
  if (!text) {
    throw new ParsingError(COMMON_ADDRESS_VALIDATION_MESSAGE);
  }

  const addressComponents = text.split(',');

  if (addressComponents.length !== 2) {
    throw new ParsingError(COMMON_ADDRESS_VALIDATION_MESSAGE);
  }

  try {
    const parsedAddress: ParsedAddress = {
      addressText: text.trim(),
      addressQuery: '',
    };

    const addressSlice = addressComponents[0].split(' ');

    addressSlice.forEach(i => {
      parsedAddress.addressQuery += i.toLocaleLowerCase().trim() + '_';
    });

    try {
      const zip = addressComponents[1].trim();

      if (/^\d{5}$/.test(zip)) {
        parsedAddress.addressQuery += zip;
      } else {
        throw Error;
      }
    } catch (err) {
      throw new ParsingError('Please enter a valid zip code after the address');
    }

    return parsedAddress;
  } catch (err) {
    if (err instanceof ParsingError) {
      throw err;
    }

    throw new ParsingError('Address type is not supported');
  }
};
