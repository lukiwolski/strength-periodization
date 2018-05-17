import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExerciseSelect from '../ExerciseSelect';
import Overview from '../Overview';
import ExerciseCard from '../ExerciseCard';
import { SessionContext } from '../../contexts';

class WorkoutPlan extends Component {
  state = {
    workoutPlan: this.props.workoutPlan,
    exerciseInProgress: null,
    repsDone: null,
    weight: null,
    type: null,
  };

  updateSelectedStatus = name => {
    this.setState({ exerciseInProgress: name });
  };

  incrementRep = () => {
    this.setState({ repsDone: this.state.repsDone + 1 });
  };

  render() {
    return (
      <SessionContext.Provider
        session={{
          ...this.state,
          updateSelectedStatus: this.updateSelectedStatus,
          incrementRep: this.incrementRep,
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
