import { typedAction } from './index';

const PERSIST_KEY = 'system';

// types
const TOGGLE_COLOR_MODE = 'TOGGLE_COLOR_MODE';
const SET_BASE_CURRENCY = 'SET_BASE_CURRENCY';
const SET_REFRESH_INTERVAL = 'SET_REFRESH_INTERVAL';
const ADD_CURRENCY = 'ADD_CURRENCY';
const REMOVE_CURRENCY = 'REMOVE_CURRENCY';

// initial state shape
const defaultState: SystemState = {
  refreshInterval: 5000,
  baseCurrency: 'USD',
  currencies: ['USD', 'JPY', 'CNY', 'EUR'],
  colorMode: 'light',
};
const preloadedState: SystemState = JSON.parse(localStorage.getItem(PERSIST_KEY));
const initialState: SystemState = preloadedState || defaultState;

// action creators
export const toggleColorMode = () => typedAction(TOGGLE_COLOR_MODE);
export const setBaseCurrency = (value) => typedAction(SET_BASE_CURRENCY, value);
export const setRefreshInterval = (value) => typedAction(SET_REFRESH_INTERVAL, value);
export const addCurrency = (value) => typedAction(ADD_CURRENCY, value);
export const removeCurrency = (value) => typedAction(REMOVE_CURRENCY, value);

// selectors ~~~~
export const getSystem = (state) => state.system;

export default (state = initialState, action): SystemState => {
  let nextState = state;
  switch (action.type) {
    case TOGGLE_COLOR_MODE:
      const nextColor = state.colorMode === 'light' ? 'dark' : 'light';
      nextState = { ...state, colorMode: nextColor };
      break;
    case SET_BASE_CURRENCY:
      nextState = { ...state, baseCurrency: action.payload };
      break;
    case SET_REFRESH_INTERVAL:
      nextState = { ...state, refreshInterval: action.payload };
      break;
    case ADD_CURRENCY:
      nextState = { ...state, currencies: [...state.currencies, action.payload] };
      break;
    case REMOVE_CURRENCY:
      nextState = {
        ...state,
        currencies: state.currencies.filter((item) => item !== action.payload),
      };
      break;
    default:
      break;
  }
  localStorage.setItem(PERSIST_KEY, JSON.stringify(nextState));
  return nextState;
};
