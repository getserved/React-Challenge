import { useState } from 'react';
import * as api from './api';
import { formatDateTime, getSupportedCurrencies } from './utils';
import { mockDoctors, mockExchangeRates, mockExchangeRateTime } from './__mock';

/**
 * @function useGetTravellingData
 * @author Jackie
 * @returns return travelling data from server, or empty values.
 */
const useGetTravellingData = () => {
  // Mock data is used until we can get data from server
  const [data, setData] = useState({
    doctors: mockDoctors.results,
    exchangeRates: getSupportedCurrencies(mockExchangeRates.rates),
    exchangeRateTime: formatDateTime(mockExchangeRateTime.epoch),
  });

  // TODO: get doctors, exchange rates, and exchange rate time from server
  // You can use these: api.getDoctors(), api.getExchangeRates(), api.getExchangeRateTime()

  return data;
};

export default useGetTravellingData;
