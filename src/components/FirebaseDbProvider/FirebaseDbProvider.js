import { Component } from 'react';
import PropTypes from 'prop-types';

import { firestore } from '../../configs/firebase';

class FirebaseDbProvider extends Component {
  state = {
    workoutPlan: null,
  };

  componentDidMount() {
    firestore.then(this.handleFirestoreRequest);
  }

  handleFirestoreRequest = response =>
    response
      .collection('summary')
      .doc(this.props.uid)
      .get()
      .then(doc => this.setState({ workoutPlan: doc.data() }));

  render() {
    return this.props.render(this.state.workoutPlan);
  }
}

FirebaseDbProvider.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default FirebaseDbProvider;
