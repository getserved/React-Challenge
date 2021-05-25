import { useState, useEffect } from 'react';
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
    doctors: [],
    exchangeRates: [],
    exchangeRateTime: null,
  });

  useEffect(async () => {
    const doctors = await api.getDoctors();
    const exchangeRates = await api.getExchangeRates();
    const exchangeRateTime = await api.getExchangeRateTime();
    
    const result = {
      doctors: doctors.data.results,
      exchangeRates: getSupportedCurrencies(exchangeRates.data.rates),
      exchangeRateTime: formatDateTime(exchangeRateTime.epoch)
    }
    console.log("result", result)
    setData(result);
  }, []);
  // TODO: get doctors, exchange rates, and exchange rate time from server
  // You can use these: api.getDoctors(), api.getExchangeRates(), api.getExchangeRateTime()

  return data;
};

export default useGetTravellingData;
