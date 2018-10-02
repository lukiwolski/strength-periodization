import React, { Component, Fragment } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import Header from './components/Header';

import Auth, { AuthContext } from './components/Firebase/Auth';
import Firestore from './components/Firebase/Firestore';
import WorkoutPlan from './components/WorkoutPlan/WorkoutPlan';
import AuthenticationLoader from './components/AuthenticationLoader';

import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Auth>
          <Fragment>
            <CssBaseline />
            <Header />
            <AuthContext.Consumer>
              {({ user, isAuthenticating }) => {
                if (isAuthenticating) {
                  return (
                    <div className={styles.progressWrapper}>
                      <AuthenticationLoader />
                    </div>
                  );
                }

                if (!isAuthenticating && user) {
                  return (
                    <Firestore user={user}>
                      <WorkoutPlan />
                    </Firestore>
                  );
                }

                return (
                  <div className={styles.warningWrapper}>
                    <Paper>
                      <Typography component="p" className={styles.warningText}>
                        You need to be logged in to continue
                      </Typography>
                    </Paper>
                  </div>
                );
              }}
            </AuthContext.Consumer>
          </Fragment>
        </Auth>
      </div>
    );
  }
}

export default App;
