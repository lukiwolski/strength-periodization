import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ExerciseSelect from '../ExerciseSelect';
import Overview from '../Overview';
import ExerciseCard from '../ExerciseCard';

class WorkoutPlan extends PureComponent {
  render() {
    return (
      <Fragment>
        <ExerciseSelect />
        <Overview />
        <ExerciseCard />
      </Fragment>
    );
  }
}

WorkoutPlan.propTypes = {};

export default WorkoutPlan;
