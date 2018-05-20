import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { auth, provider } from '../../configs/firebase';
import { UserContext } from '../../contexts';

class FirebaseUserProvider extends Component {
  state = {
    user: null,
  };

  handleSignIn = () => {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;

      this.setState({
        user,
      });
    });
  };

  handleSignOut = () => {
    auth.signOut();
    this.setState({ user: null });
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      return this.setState({ user });
    });
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          handleSignOut: this.handleSignOut,
          handleSignIn: this.handleSignIn,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

FirebaseUserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FirebaseUserProvider;
