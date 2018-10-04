import React, { PureComponent, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { auth, provider } from '../../utils/firestore';

export const AuthenticationContext = createContext();

class Authentication extends PureComponent {
  state = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticating: false,
    signingWithPopup: false,
  };

  handleSignIn = () => {
    // @TODO Add loading screen when authenticating in other tab
    // this.setState({ signingWithPopup: true });
    auth.signInWithPopup(provider).then(signIn => {
      this.setState({ user: signIn.user, signingWithPopup: false });
      localStorage.setItem('user', JSON.stringify(signIn.user));
      this.props.history.push('/overview');
    });
  };

  handleSignOut = () => {
    auth.signOut();
    this.setState({ user: null, profile: null });
    localStorage.clear();
    this.props.history.push('/');
  };

  componentDidMount() {
    this.setState({ isAuthenticating: true });

    auth.onAuthStateChanged(user => {
      this.setState({ user, isAuthenticating: false });
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  render() {
    return (
      <AuthenticationContext.Provider
        value={{
          handleSignIn: this.handleSignIn,
          handleSignOut: this.handleSignOut,
          user: this.state.user,
          isAuthenticating: this.state.isAuthenticating,
        }}
      >
        {this.props.children}
      </AuthenticationContext.Provider>
    );
  }
}

Authentication.propTypes = {
  children: PropTypes.element,
};

export default withRouter(Authentication);
