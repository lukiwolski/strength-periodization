import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Either } from 'ramda-fantasy';

import ExerciseSelect from '../ExerciseSelect';
import Overview from '../Overview';
import ExerciseCard from '../ExerciseCard';

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

  selectExercise = name => {};

  incrementSet = () => {
    this.setState({
      // ...handleSetUpdate(this.state),
    });
  };

  render() {
    return (
      <Fragment>
        <ExerciseSelect />
        <ExerciseCard />
        <Overview />
      </Fragment>
    );
  }
}

WorkoutPlan.propTypes = {
  workoutPlan: PropTypes.object,
};

export default WorkoutPlan;
