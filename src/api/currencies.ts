import { http } from '../utils';
import { API_BASE_URL } from '../constants';
/**
 * API functions
 *
 * putting these API functions in this seperate directory so that if needed we can switch out the API cleanly
 *
 * currently using: https://exchangeratesapi.io/
 */

const denormalizeDate = (maybeDate) => {
  if (!maybeDate) return null;
  const definitelyDate = new Date(maybeDate);
  const year = definitelyDate.getFullYear();
  const month = definitelyDate.getMonth() + 1;
  const day = definitelyDate.getDate();
  return `${year}-${month}-${day}`;
};

export const readLatestRates = async ({ baseCurrency, symbols = [] }) => {
  const params = new URLSearchParams({ base: baseCurrency, symbols: symbols.join(',') });
  const { rates } = await http.get(`${API_BASE_URL}/latest?${params.toString()}`);
  return rates;
};

export const readHistoricalRates = async ({ baseCurrency, symbols = [], startAt, endAt }) => {
  const start_at = denormalizeDate(startAt);
  const end_at = denormalizeDate(endAt);
  const params = new URLSearchParams({
    base: baseCurrency,
    symbols: symbols.join(','),
    ...(start_at ? { start_at } : null),
    ...(end_at ? { end_at } : null),
  });
  const { rates } = await http.get(`${API_BASE_URL}/history?${params.toString()}`);
  return rates;
};
