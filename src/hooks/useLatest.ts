import { useSelector } from 'react-redux';
import { getLatest } from '../store';

const isEqual = (prevState, nextState): boolean => {
  return nextState.currencies.latestFetchedAt === prevState.currencies.latestFetchedAt;
};

const useLatest = () => {
  const latestState = useSelector(getLatest, isEqual);
  return latestState;
};

export default useLatest;
