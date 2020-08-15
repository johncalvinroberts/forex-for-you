import { typedAction } from './index';

const PERSIST_KEY = 'system';

// types
const TOGGLE_COLOR_MODE = 'TOGGLE_COLOR_MODE';
const SET_BASE_CURRENCY = 'SET_BASE_CURRENCY';
const SET_REFRESH_INTERVAL = 'SET_REFRESH_INTERVAL';
const SET_PREFERRED_SYMBOLS = 'SET_PREFERRED_SYMBOLS';

// initial state shape
const defaultState: SystemState = {
  refreshInterval: 30000,
  baseCurrency: 'USD',
  preferredSymbols: ['USD', 'JPY', 'CNY', 'EUR'],
  colorMode: 'light',
};
const preloadedState: SystemState = JSON.parse(localStorage.getItem(PERSIST_KEY));
const initialState: SystemState = preloadedState || defaultState;

// action creators
export const toggleColorMode = () => typedAction(TOGGLE_COLOR_MODE);
export const setBaseCurrency = (value) => typedAction(SET_BASE_CURRENCY, value);
export const setRefreshInterval = (value) => typedAction(SET_REFRESH_INTERVAL, value);
export const setPreferredSymbols = (value) => typedAction(SET_PREFERRED_SYMBOLS, value);

// selectors ~~~~
export const getSystem = (state) => state.system;

// the reducer, main thing here
export default (state = initialState, action): SystemState => {
  let update = {};
  switch (action.type) {
    case TOGGLE_COLOR_MODE:
      const nextColor = state.colorMode === 'light' ? 'dark' : 'light';
      update = { colorMode: nextColor };
      break;
    case SET_BASE_CURRENCY:
      update = { baseCurrency: action.payload };
      break;
    case SET_REFRESH_INTERVAL:
      update = { refreshInterval: action.payload };
      break;
    case SET_PREFERRED_SYMBOLS:
      update = {
        preferredSymbols: action.payload,
      };
      break;
    default:
      break;
  }
  const nextState = { ...state, ...update };
  localStorage.setItem(PERSIST_KEY, JSON.stringify(nextState));
  return nextState;
};
