import React, { PureComponent, createContext } from 'react';
import PropTypes from 'prop-types';

import { firestore } from '../../configs/firebase';
import getExerciseDetails from './utils/getExerciseDetails';

export const FirestoreContext = createContext('Firestore');

const initialWorkoutDetails = {
  exerciseInProgress: null,
  setsDone: 0,
  sets: 0,
  reps: 0,
  weight: 0,
  type: null,
  isLocked: false,
};

class Firestore extends PureComponent {
  state = {
    profile: null,
    db: null,
    errorMessage: null,
    workoutDetails:
      JSON.parse(localStorage.getItem('workoutDetails')) ||
      initialWorkoutDetails,
  };

  componentDidMount() {
    firestore.then(db => {
      this.setState({ db });

      db
        .collection('profiles')
        .doc(this.props.user.uid)
        .onSnapshot(doc => {
          this.setState({ profile: doc.data() });
          localStorage.setItem('profile', JSON.stringify(doc.data()));
        });
    });
  }

  addExercise = (name, singleRepMax) => {
    const { profile } = this.state;

    this.state.db
      .collection('profiles')
      .doc(this.props.user.uid)
      .update({
        [name]: {
          categoriesDone: [],
          cyclesDone: 0,
          singleRepMax,
        },
        exercises: [name, ...(profile.exercises && profile.exercises)],
      });
  };

  selectExercise = name => {
    const { errorMessage, ...workoutDetails } = getExerciseDetails(
      name,
      this.state.profile
    );

    if (errorMessage) {
      this.setState({ errorMessage });
    } else {
      this.setState({
        workoutDetails: {
          ...this.state.workoutDetails,
          ...workoutDetails,
        },
      });
    }
  };

  incrementSet = () => {
    const { setsDone, sets } = this.state.workoutDetails;

    if (setsDone < sets) {
      this.setState({
        workoutDetails: {
          ...this.state.workoutDetails,
          setsDone: setsDone + 1,
          isLocked: true,
        },
      });
    } else {
      this.setState({
        workoutDetails: initialWorkoutDetails,
      });
    }
  };

  render() {
    return (
      <FirestoreContext.Provider
        value={{
          profile: this.state.profile,
          workoutDetails: this.state.workoutDetails,
          addExercise: this.addExercise,
          selectExercise: this.selectExercise,
          incrementSet: this.incrementSet,
        }}
      >
        {this.props.children}
      </FirestoreContext.Provider>
    );
  }
}

Firestore.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object,
};

export default Firestore;
