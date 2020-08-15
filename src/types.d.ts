type SystemState = {
  refreshInterval: number;
  baseCurrency: string;
  preferredSymbols: string[];
  colorMode: string;
};

// an individual currency entry is called a "currency slice"
// each is formatted as, [symbol]: <exchange rate>
type ExchangeRateSlice = Record<string, number>;

type CurrenciesState = {
  historical: Record<string, ExchangeRateSlice>;
  latest: ExchangeRateSlice;
  historicalStartDate?: Date;
  historicalEndDate?: Date;
  latestDate?: Date;
  historicalFetchedAt?: Date;
  isHistoricalFetching: boolean;
  latestFetchedAt?: Date;
  isLatestFetching: boolean;
};
