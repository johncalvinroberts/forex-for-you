import React, { FC, StrictMode } from 'react';
import { Route } from 'wouter';
import { Root, Settings } from '../pages';

const App: FC = () => {
  return (
    <StrictMode>
      <Route path="/">
        <Root />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
    </StrictMode>
  );
};

export default App;
