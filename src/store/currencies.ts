import dayjs from 'dayjs';
import { readHistoricalRates, readLatestRates } from '../api';
import { typedAction } from './index';

const PERSIST_KEY = 'currencies';

/**
 * types
 */
const INIT_LOAD_RATES = 'INIT_LOAD_RATES';
const RECEIVE_ERROR = 'RECEIVE_ERROR';
const LOAD_RATES_SUCCESS = 'LOAD_RATES_SUCCESS';
const RESET = 'RESET';

/**
 * action creators
 */
const receiveError = (payload) => typedAction(RECEIVE_ERROR, payload);
const loadRatesSuccess = (payload) => typedAction(LOAD_RATES_SUCCESS, payload);

// main important data fetching function/action creator -- loadLatestRates and loadHistoricalRates
export const loadLatestRates = () => async (dispatch, getState) => {
  const {
    system: { preferredSymbols, baseCurrency },
  } = getState();

  try {
    const latestDate = new Date();
    // start fetching
    dispatch({
      type: INIT_LOAD_RATES,
      payload: { latestDate, isLatestFetching: true },
    });
    // fetch the data
    const latest = await readLatestRates({ symbols: preferredSymbols, baseCurrency });
    // dispatch success
    dispatch(loadRatesSuccess({ latest, isLatestFetching: false, latestFetchedAt: new Date() }));
  } catch (error) {
    dispatch(receiveError({ error, isLatestFetching: false }));
  }
};

export const loadHistoricalRates = () => async (dispatch, getState) => {
  const {
    system: { preferredSymbols, baseCurrency },
  } = getState();
  try {
    const historicalEndDate = dayjs().subtract(1, 'day');
    const historicalStartDate = dayjs().subtract(30, 'day');
    // start fetching
    dispatch({
      type: INIT_LOAD_RATES,
      payload: { historicalEndDate, historicalStartDate, isHistoricalFetching: true },
    });
    // fetch the data
    const historical = await readHistoricalRates({
      symbols: preferredSymbols,
      baseCurrency,
      startAt: historicalStartDate,
      endAt: historicalEndDate,
    });
    // dispatch success
    dispatch(
      loadRatesSuccess({
        historical,
        historicalFetchedAt: new Date(),
        isHistoricalFetching: false,
      }),
    );
  } catch (error) {
    dispatch(receiveError({ error, isHistoricalFetching: false }));
  }
};

export const resetCurrenciesState = () => typedAction(RESET);

// selectors
export const getLatest = (state) => {
  const currenciesState: CurrenciesState = state.currencies;
  const {
    latest,
    latestFetchedAt: fetchedAt,
    latestDate,
    isLatestFetching: isFetching,
  } = currenciesState;
  return { latest, fetchedAt, latestDate, isFetching };
};

export const getHistorical = (state) => {
  const currenciesState: CurrenciesState = state.currencies;
  const {
    historical,
    historicalFetchedAt: fetchedAt,
    historicalStartDate,
    historicalEndDate,
    isHistoricalFetching: isFetching,
  } = currenciesState;
  return { historical, fetchedAt, historicalStartDate, historicalEndDate, isFetching };
};

export const getSymbolHistoricalData = (symbol, state) => {
  const { historical } = getHistorical(state);
  const symbolHistoricalData = Object.keys(historical).map((date) => {
    const value = historical[date][symbol];
    return [date, value];
  });
  return symbolHistoricalData;
};

export const getHistoricalDates = (state) => {
  const { historical } = state.currencies;
  return Object.keys(historical).map((item) => dayjs(item).format('MM/DD'));
};

// default state -- if the state is stored in local storage, use that one as our initial state
// even if it might be stale
const defaultState: CurrenciesState = {
  historical: {},
  latest: {},
  errors: [],
  latestDate: null,
  historicalEndDate: null,
  historicalStartDate: null,
  isLatestFetching: false,
  latestFetchedAt: null,
  isHistoricalFetching: false,
  historicalFetchedAt: null,
};

const preloadedState: CurrenciesState = JSON.parse(localStorage.getItem(PERSIST_KEY));
const initialState: CurrenciesState = preloadedState || defaultState;

// the reducer, main thing here
export default (state = initialState, action) => {
  let update = {};

  switch (action.type) {
    case INIT_LOAD_RATES:
      update = { ...action.payload };
      break;
    case RECEIVE_ERROR:
      const { error, ...rest } = action.payload;
      update = { errors: [...state.errors, error], ...rest };
      break;
    case LOAD_RATES_SUCCESS:
      update = { ...action.payload };
      break;
    case RESET:
      update = defaultState;
      break;
    default:
      break;
  }
  const nextState = { ...state, ...update };
  localStorage.setItem(PERSIST_KEY, JSON.stringify(nextState));
  return nextState;
};
