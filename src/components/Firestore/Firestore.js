import React, { Component, createContext } from 'react';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import { prop } from 'ramda';

import { initialValues } from './firestoreSchema';
import { firestore } from '../../utils/firestore';
import {
  getExerciseValues,
  checkIfShouldIncrementCycles,
} from '../../utils/exerciseValuesBuilder';

export const FirestoreContext = createContext('Firestore');

class Firestore extends Component {
  state = {
    profile: null,
    dbRef: null,
    errorMessage: null,
    currentExerciseValues: initialValues,
    isLoading: false,
    selectedExercise: null,
    setsDone: 0,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    firestore.then(db => {
      const dbRef = db.collection('profiles').doc(this.props.user.uid);

      this.setState({
        isLoading: false,
        dbRef,
        dbBatch: db.batch(),
      });

      dbRef.onSnapshot(doc => {
        console.log(doc.data());
        this.setState({ profile: doc.data() });
      });
    });
  }

  addExercise = (name, singleRepMax) => {
    const { exercises } = this.state.profile;

    this.state.dbRef.update({
      [name]: {
        categoriesDone: [],
        cyclesDone: 0,
        singleRepMax,
      },
      exercises: [name, ...(exercises ? exercises : [])],
    });
  };

  selectExercise = name => {
    const { errorMessage, ...currentExerciseValues } = getExerciseValues(
      name,
      this.state.profile
    );

    if (errorMessage) {
      this.setState({ errorMessage });
    } else {
      this.setState({
        currentExerciseValues,
        selectedExercise: name,
      });
    }
  };

  incrementSet = () => {
    const { dbRef, profile, selectedExercise } = this.state;
    const setsDone = prop([selectedExercise, 'setsDone'], profile);

    dbRef.update({
      [`${selectedExercise}.setsDone`]: setsDone + 1,
      inProgress: selectedExercise,
    });
  };

  completeExercise = name => {
    const { categoriesDone, cyclesDone } = this.state.profile[name];
    const shouldIncrementCycles = checkIfShouldIncrementCycles(categoriesDone);

    this.state.dbRef.update({
      inProgress: null,
      [name]: {
        setsDone: 0,
        cyclesDone: shouldIncrementCycles ? cyclesDone + 1 : cyclesDone,
        categoriesDone: [
          ...(shouldIncrementCycles
            ? []
            : [...categoriesDone, this.state.workoutDetails.type]),
        ],
      },
    });
  };

  removeExercise = e => {
    const {
      dbRef,
      workoutDetails: { exerciseInProgress },
      profile: { exercises },
    } = this.state;

    dbRef.update({
      [exerciseInProgress]: firebase.firestore.FieldValue.delete(),
      // remove exercises in progress from the list of exercises
      exercises: exercises.filter(exercise => exercise !== exerciseInProgress),
    });
  };

  render() {
    const {
      currentExerciseValues,
      selectedExercise,
      setsDone,
      profile,
      isLoading,
    } = this.state;
    return (
      <FirestoreContext.Provider
        value={{
          addExercise: this.addExercise,
          selectExercise: this.selectExercise,
          incrementSet: this.incrementSet,
          removeExercise: this.removeExercise,
          isLoading,
          profile,
          currentExerciseValues,
          selectedExercise,
          setsDone,
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
