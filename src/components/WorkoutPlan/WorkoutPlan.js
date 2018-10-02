import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ExerciseSelect from '../ExerciseSelect';
import ExerciseCard from '../ExerciseCard';

class WorkoutPlan extends Component {
  render() {
    return (
      <Fragment>
        <ExerciseSelect />
        <ExerciseCard />
      </Fragment>
    );
  }
}

WorkoutPlan.propTypes = {
  workoutPlan: PropTypes.object,
};

export default WorkoutPlan;
