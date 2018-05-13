import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { firestore } from '../../configs/firebase';

const details = {
  workoutCategories: ['hypertrophy', 'power', 'strength'],
  currentSesh: [
    {
      name: 'bench',
      currentSet: 0,
    },
  ],
};

class FirebaseDbProvider extends Component {
  state = {
    workoutPlan: null,
  };

  componentDidMount() {
    firestore
      .collection('summary')
      .doc(this.props.uid)
      .get()
      .then(doc => this.setState({ workoutPlan: doc.data() }));
  }

  render() {
    return this.props.render(this.state);
  }
}

FirebaseDbProvider.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default FirebaseDbProvider;
