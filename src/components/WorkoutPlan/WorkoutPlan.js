import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ExerciseSelect from '../ExerciseSelect';
import Overview from '../Overview';
import ExerciseCard from '../ExerciseCard';

const WorkoutPlan = ({ workoutPlan }) => {
  return (
    <Fragment>
      <ExerciseSelect exercises={workoutPlan.exercises} />
      <ExerciseCard />
      <Overview />
    </Fragment>
  );
};

WorkoutPlan.propTypes = {
  workoutPlan: PropTypes.object,
};

export default WorkoutPlan;
