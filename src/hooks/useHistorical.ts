import { useSelector } from 'react-redux';
import { getHistorical } from '../store';
import useWhyDidYouUpdate from './useWhyDidYouUpdate';

const isEqual = (prevState, nextState): boolean => {
  return nextState.currencies.historicalFetchedAt === prevState.currencies.historicalFetchedAt;
};

const useHistorical = () => {
  const historicalState = useSelector(getHistorical, isEqual);
  useWhyDidYouUpdate('useHistorical', historicalState);
  return historicalState;
};

export default useHistorical;
