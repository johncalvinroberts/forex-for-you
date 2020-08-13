type SystemState = {
  refreshInterval: number;
  baseCurrency: string;
  currencies: string[];
  colorMode: string;
};

type CurrencyDayItemType = {
  id: string;
  exchangeRate: number;
  baseValue: number;
  error: unknown;
};

type CurrencyItemType = {
  id: string;
  days: CurrencyDayItemType[];
};
