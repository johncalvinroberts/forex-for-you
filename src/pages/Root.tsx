import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, toggleColorMode } from '../store';

const Root: FC = () => {
  const dispatch = useDispatch();

  const colorMode = useSelector((state: RootState) => state.system.colorMode);
  const handleClick = () => {
    dispatch(toggleColorMode());
  };

  return (
    <div>
      <div>the current color: {colorMode}</div>
      <div>
        <button onClick={handleClick}>click meh</button>
      </div>
    </div>
  );
};

export default Root;
