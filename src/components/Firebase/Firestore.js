import React, { PureComponent, createContext } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';

import { firestore } from '../../configs/firebase';
import getExerciseDetails from './utils/getExerciseDetails';

export const FirestoreContext = createContext('Firestore');

const NUMBER_OF_CATEGORIES = 2;

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
        exercises: [name, ...(profile.exercises ? profile.exercises : [])],
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
    const { setsDone, sets, exerciseInProgress } = this.state.workoutDetails;

    if (setsDone < sets - 1) {
      this.setState({
        workoutDetails: {
          ...this.state.workoutDetails,
          setsDone: setsDone + 1,
          isLocked: true,
        },
      });
    } else {
      this.completeExercise(exerciseInProgress);
    }
  };

  completeExercise = name => {
    const { categoriesDone, cyclesDone } = this.state.profile[name];
    const increaseCycle = categoriesDone.length === NUMBER_OF_CATEGORIES;
    const ref = this.state.db.collection('profiles').doc(this.props.user.uid);

    this.setState({
      workoutDetails: initialWorkoutDetails,
    });

    if (increaseCycle) {
      ref.update({
        [`${name}.categoriesDone`]: [],
        [`${name}.cyclesDone`]: cyclesDone + 1,
      });
    } else {
      ref.update({
        [`${name}.categoriesDone`]: [
          ...categoriesDone,
          this.state.workoutDetails.type,
        ],
      });
    }
  };

  removeExercise = e => {
    this.setState({
      workoutDetails: initialWorkoutDetails,
    });

    const {
      db,
      workoutDetails: { exerciseInProgress },
      profile: { exercises },
    } = this.state;

    db
      .collection('profiles')
      .doc(this.props.user.uid)
      .update({
        [exerciseInProgress]: firebase.firestore.FieldValue.delete(),
        // remove exercises in progress from the list of exercises
        exercises: exercises.filter(
          exercise => exercise !== exerciseInProgress
        ),
      });
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
          removeExercise: this.removeExercise,
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
