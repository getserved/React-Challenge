export const mockDoctors = {
  results: [
    {
      name: { title: 'Mrs', first: 'Silje', last: 'Møller' },
      email: 'silje.moller@example.com',
      nat: 'FR',
      picture: {
        large: 'https://randomuser.me/api/portraits/women/10.jpg',
      },
    },
    {
      name: { title: 'Miss', first: 'Charlotte', last: 'Young' },
      email: 'charlotte.young@example.com',
      nat: 'US',
      picture: {
        large: 'https://randomuser.me/api/portraits/women/11.jpg',
      },
    },
    ,
  ],
};

export const mockExchangeRates = {
  rates: {
    usd: { name: 'US Dollar', unit: '$', value: 49846.115, type: 'fiat' },
    eur: { name: 'Euro', unit: '€', value: 41294.117, type: 'fiat' },
    gbp: { name: 'British Pound', unit: '£', value: 35990.889, type: 'fiat' },
    hkd: { name: 'HK Dollar', unit: 'HK$', value: 386819.066, type: 'fiat' },
  },
};

export const mockExchangeRateTime = {
  data: { iso: '2021-04-23T16:31:58Z', epoch: 1619195518 },
};
