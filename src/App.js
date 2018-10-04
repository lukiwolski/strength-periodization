import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Loadable from 'react-loadable';

import Header from './components/Header/Header';
import Authentication, {
  AuthenticationContext,
} from './components/Authentication/Authentication';
import Loading from './components/Loading/Loading';

const LoadableRouting = Loadable({
  loader: () => import('./components/Routing/Routing'),
  loading: Loading,
});

const App = () => (
  <Router>
    <Authentication>
      <Fragment>
        <Header />

        <AuthenticationContext.Consumer>
          {authenticationProps => <LoadableRouting {...authenticationProps} />}
        </AuthenticationContext.Consumer>
      </Fragment>
    </Authentication>
  </Router>
);

export default App;
