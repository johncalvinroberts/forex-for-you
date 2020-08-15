import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import system from './system';
import currencies from './currencies';
export * from './system';
export * from './currencies';

/**
 * some helpers - allows us to use typical redux action, but with some nice type inference
 */

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P,
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

/**
 * logs all actions and states after they are dispatched.
 *
 * ONLY FOR DEVELOPMENT
 *
 * first line of this function disables this in production env
 */
const logger = (store) => (next) => (action) => {
  const shouldLog = process.env.NODE_ENV === 'development';
  if (shouldLog) {
    console.group(action.type);
    console.info('dispatching', action);
  }
  const result = next(action);
  const nextGlobalState = store.getState();
  if (shouldLog) {
    console.log('next state');
    console.groupEnd();
    window['__state'] = nextGlobalState;
  }
  return result;
};

/**
 * global store setup
 */

// combine reducers into our root reducer
const rootReducer = combineReducers({
  system,
  currencies,
});
// export the inferred state of "root reducer" for other places in the app
export type RootState = ReturnType<typeof rootReducer>;
// iniitalize our store
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
