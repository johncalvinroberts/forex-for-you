import React, { FC, StrictMode } from 'react';
import { Route, Switch } from 'wouter';
import { Root, Settings, NotFound } from '../pages';
import Theme from './Theme';

/**
 * App - main entry point of our frontend application
 *
 * All context/state wrappers, as well as layout wrappers should go here.
 *
 * Regarding routing, we wrap all the routes in <Switch> component, so that we can fall back to the <NotFound/> component for 404s
 */

const App: FC = () => {
  return (
    <StrictMode>
      <Theme>
        <Switch>
          <Route path="/">
            <Root />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Theme>
    </StrictMode>
  );
};

export default App;
