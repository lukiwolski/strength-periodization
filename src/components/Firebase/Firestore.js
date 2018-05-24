import React, { PureComponent, createContext } from 'react';
import PropTypes from 'prop-types';
import { Either } from 'ramda-fantasy';

import { firestore } from '../../configs/firebase';
import getExerciseDetails from './utils/getExerciseDetails';

export const FirestoreContext = createContext('Firestore');

const initialWorkoutDetails = {
  exerciseInProgress: null,
  setsDone: null,
  sets: null,
  reps: null,
  weight: null,
  type: null,
  isLocked: null,
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
        exercises: [name, ...(profile.exercises ? [profile.exercises] : [])],
      });
  };

  selectExercise = name => {
    const exerciseDetails = getExerciseDetails(name, this.state.profile);

    return Either.isLeft(exerciseDetails)
      ? this.setState({
          errorMessage: exerciseDetails.value.errorMessage,
        })
      : this.setState({
          ...exerciseDetails,
        });
  };

  incrementSet = () => {
    this.setState({
      // ...handleSetUpdate(this.state),
    });
  };

  render() {
    return (
      <FirestoreContext.Provider
        value={{
          db: this.state.db,
          profile: this.state.profile,
          addExercise: this.addExercise,
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
