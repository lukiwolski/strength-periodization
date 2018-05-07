import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import Button from 'material-ui/Button';
import Header from './components/Header';
import ExerciseCard from './components/ExerciseCard';
import ExerciseSelect from './components/ExerciseSelect';
import Overview from './components/Overview';

import styles from './App.module.css';

const hypertrophy = {
  sets: 3,
  reps: 8,
  base: 60,
};

const power = {
  sets: 5,
  reps: 5,
  base: 70,
};

const strength = {
  sets: 6,
  reps: 3,
  base: 80,
};

const currentSesh = {
  bench: {
    currentWorkout: null,
    completedWorkouts: [],
    currentSet: 0,
    cycle: 0,
  },
};

class App extends Component {
  static state = {
    workouts: ['hypertrophy', 'power', 'strength'],
  };

  render() {
    return (
      <div className={styles.App}>
        <CssBaseline />
        <Header />
        <ExerciseSelect />
        <Overview />
        <ExerciseCard />
      </div>
    );
  }
}

export default App;
