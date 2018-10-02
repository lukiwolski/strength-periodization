import React, { PureComponent, createContext } from 'react';
import PropTypes from 'prop-types';

import { auth, provider } from '../../configs/firebase';

export const AuthContext = createContext('Auth');

class Auth extends PureComponent {
  state = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticating: false,
  };

  handleSignIn = () => {
    auth.signInWithPopup(provider).then(signIn => {
      this.setState({ user: signIn.user });
      localStorage.setItem('user', JSON.stringify(signIn.user));
    });
  };

  handleSignOut = () => {
    auth.signOut();
    this.setState({ user: null, profile: null });
    localStorage.clear();
  };

  componentDidMount() {
    this.setState({
      isAuthenticating: true,
    });

    auth.onAuthStateChanged(user => {
      this.setState({ user, isAuthenticating: false });
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          handleSignIn: this.handleSignIn,
          handleSignOut: this.handleSignOut,
          user: this.state.user,
          isAuthenticating: this.state.isAuthenticating,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

Auth.propTypes = {
  children: PropTypes.element,
};

export default Auth;
