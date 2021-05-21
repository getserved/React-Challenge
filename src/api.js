import axios from 'axios';

/**
 * @function getDoctors
 * @author Jackie
 * @returns get affiliated doctors around the world
 */
export const getDoctors = () => {
  return axios.get(
    'https://randomuser.me/api/?nat=us,fr,gb&results=6&inc=name,email,nat,picture'
  );
};

/**
 * @function getExchangeRates
 * @author Jackie
 * @returns get exchange rates
 */
export const getExchangeRates = () => {
  return axios.get(
    'https://api.coingecko.com/api/v3/exchange_rates?currency=aud'
  )
};

/**
 * @function getExchangeRateTime
 * @author Jackie
 * @returns get date-time exchange rates are requested
 */
export const getExchangeRateTime = () => {
  return axios.get('https://api.coinbase.com/v2/time');
};

/**
 * @function submitRequest
 * @author Jackie
 * @returns submit Pension request
 */
export const submitRequest = (data) => {
  return axios.post('https://httpbin.org/post', data);
};
