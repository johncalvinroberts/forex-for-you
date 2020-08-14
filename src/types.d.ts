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
  error: unknown; // presume this goes here, if we have to fetch individual day items
};

type CurrencyItemType = {
  id: string;
  days: CurrencyDayItemType[];
};
