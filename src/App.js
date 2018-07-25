import React, { Component, Fragment } from 'react';
import CssBaseline from 'material-ui/CssBaseline';

import Header from './components/Header';

import styles from './App.module.css';
import Auth, { AuthContext } from './components/Firebase/Auth';
import Firestore from './components/Firebase/Firestore';
import WorkoutPlan from './components/WorkoutPlan/WorkoutPlan';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Auth>
          <Fragment>
            <CssBaseline />
            <Header />
            <AuthContext.Consumer>
              {({ user }) =>
                user ? (
                  <Firestore user={user}>
                    <WorkoutPlan />
                  </Firestore>
                ) : (
                  <div>You need to login to continue</div>
                )
              }
            </AuthContext.Consumer>
          </Fragment>
        </Auth>
      </div>
    );
  }
}

export default App;
