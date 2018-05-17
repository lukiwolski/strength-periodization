import React, { Component, Fragment } from 'react';
import CssBaseline from 'material-ui/CssBaseline';

import Header from './components/Header';
import FirebaseUserProvider from './components/FirebaseUserProvider';
import { UserContext } from './contexts';

import styles from './App.module.css';
import FirebaseDbProvider from './components/FirebaseDbProvider';
import WorkoutPlan from './components/WorkoutPlan';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <FirebaseUserProvider>
          <Fragment>
            <CssBaseline />
            <Header />
            <UserContext.Consumer>
              {({ user }) =>
                user ? (
                  <FirebaseDbProvider
                    uid={user.uid}
                    render={workoutPlan =>
                      workoutPlan ? (
                        <WorkoutPlan workoutPlan={workoutPlan} />
                      ) : (
                        <div>Loader or something</div>
                      )
                    }
                  />
                ) : (
                  <div>Logo or something</div>
                )
              }
            </UserContext.Consumer>
          </Fragment>
        </FirebaseUserProvider>
      </div>
    );
  }
}

export default App;
