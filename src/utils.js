import moment from 'moment';

// supported currencies
const SUPPORTED_CURRENCIES = ['usd', 'eur', 'gbp'];

/**
 * @function getSupportedCurrencies
 * @author Jackie
 * @returns only supported currencies
 */
export const getSupportedCurrencies = (exchangeRates) =>
  SUPPORTED_CURRENCIES.map((currency) => exchangeRates[currency]);

/**
 * @function formatDateTime
 * @author Jackie
 * @returns formatted date-time with DD/MM/YYYY hh:mm:ss
 */
export const formatDateTime = (epoch) =>
  moment(epoch).format('DD/MM/YYYY hh:mm:ss');

/**
 * @function handleError
 * @author Jackie
 * @returns handle error
 */
export const handleError = (err) => {
  if (
    err.message === 'Network Error' ||
    err.message === 'Request failed with status code 405'
  ) {
    return 'Oops! Unexpected error';
  }

  return err.message;
};
