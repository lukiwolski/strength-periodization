import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import LoggedOut from '../LoggedOut/LoggedOut';
import Loading from '../Loading/Loading';

const LoadableOverview = Loadable({
  loader: () => import('../Overview/Overview'),
  loading: Loading,
});

class Routing extends Component {
  componentDidMount() {
    const { user, history } = this.props;

    if (user) {
      history.push('/overview');
    }
  }

  render() {
    const { user, isAuthenticating } = this.props;
    return (
      <Switch>
        <Route exact path="/" component={LoggedOut} />

        <Route
          path="/overview"
          render={() =>
            isAuthenticating ? <Loading /> : <LoadableOverview forUser={user} />
          }
        />
      </Switch>
    );
  }
}

export default withRouter(Routing);
