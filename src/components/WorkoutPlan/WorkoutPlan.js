import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExerciseSelect from '../ExerciseSelect';
import Overview from '../Overview';
import ExerciseCard from '../ExerciseCard';
import { SessionContext } from '../../contexts';

import { prop, without, head, compose } from 'ramda';

import { trainingTypes, workoutCategories } from '../../configs/trainingTypes';

const buildWorkoutPlan = (name, workoutPlan) => {
  const workout = prop(name, workoutPlan);
  const type = head(without(workout.categoriesFinished, workoutCategories));

  return {
    type,
    singeRepMax: workout.singleRepMax,
  };
};

class WorkoutPlan extends Component {
  state = {
    workoutPlan: this.props.workoutPlan,
    exerciseInProgress: null,
    setsDone: null,
    sets: null,
    reps: null,
    weight: null,
    type: null,
  };

  updateSelectedStatus = name => {
    const workout = buildWorkoutPlan(name, this.state.workoutPlan);

    this.setState({
      exerciseInProgress: name,
      type: workout.type,
      weight: workout.singeRepMax,
      sets: trainingTypes[workout.type].sets,
      reps: trainingTypes[workout.type].reps,
    });
  };

  incrementSet = () => {
    this.setState({ setsDone: this.state.setsDone + 1 });
  };

  render() {
    return (
      <SessionContext.Provider
        value={{
          ...this.state,
          updateSelectedStatus: this.updateSelectedStatus,
          incrementSet: this.incrementSet,
        }}
      >
        <ExerciseSelect />
        <ExerciseCard />
        <Overview />
      </SessionContext.Provider>
    );
  }
}

WorkoutPlan.propTypes = {
  workoutPlan: PropTypes.object,
};

export default WorkoutPlan;
