import React, { FC, StrictMode } from 'react';
import { Route, Switch } from 'wouter';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Root, Settings, NotFound } from '../pages';
import store from '../store';
import Theme from './Theme';
import Layout from './Layout';
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
      <Provider store={store}>
        <Theme>
          <Layout>
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
          </Layout>
          <ToastContainer hideProgressBar={true} draggable={false} />
        </Theme>
      </Provider>
    </StrictMode>
  );
};

export default App;
