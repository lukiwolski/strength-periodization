import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Either } from 'ramda-fantasy';

import ExerciseSelect from '../ExerciseSelect';
import Overview from '../Overview';
import ExerciseCard from '../ExerciseCard';
import { SessionContext } from '../../contexts';
import getRoutineValues from './getRoutineValues';
import handleSetUpdate from './handleSetUpdate';

class WorkoutPlan extends Component {
  state = {
    workoutPlan: this.props.workoutPlan,
    exerciseInProgress: null,
    setsDone: null,
    sets: null,
    reps: null,
    weight: null,
    type: null,
    errorMessage: null,
    isLocked: null,
  };

  selectExercise = name => {
    const routineValues = getRoutineValues(name, this.state.workoutPlan);

    return Either.isLeft(routineValues)
      ? this.setState({
          errorMessage: routineValues.value.errorMessage,
        })
      : this.setState({
          exerciseInProgress: name,
          ...routineValues,
        });
  };

  incrementSet = () => {
    this.setState({
      ...handleSetUpdate(this.state),
    });
  };

  render() {
    return this.state.errorMessage ? (
      <div>{this.state.errorMessage}</div>
    ) : (
      <SessionContext.Provider
        value={{
          ...this.state,
          selectExercise: this.selectExercise,
          incrementSet: this.incrementSet,
        }}
      >
        <ExerciseSelect />

        {this.state.exerciseInProgress ? (
          <Fragment>
            <ExerciseCard />
            <Overview />
          </Fragment>
        ) : (
          <div>Please Select an Exercise</div>
        )}
      </SessionContext.Provider>
    );
  }
}

WorkoutPlan.propTypes = {
  workoutPlan: PropTypes.object,
};

export default WorkoutPlan;
