import { useSelector } from 'react-redux';
import { getSystem } from '../store';

const useSystem = () => {
  const system = useSelector(getSystem);
  return system;
};

export default useSystem;
