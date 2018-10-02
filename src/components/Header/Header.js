import React, { PureComponent, Fragment } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { prop } from 'ramda';

import { AuthContext } from '../Firebase/Auth';

import styles from './Header.module.css';

class Header extends PureComponent {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className={styles.root}>
        <AppBar position="static">
          <Toolbar className={styles.toolbar}>
            <AuthContext.Consumer>
              {({ user, handleSignOut, handleSignIn }) => {
                const displayName = prop('displayName', user);
                return (
                  <Fragment>
                    <Typography component="p" color="inherit">
                      {displayName}
                    </Typography>

                    <Button
                      onClick={displayName ? handleSignOut : handleSignIn}
                      className={styles.button}
                    >
                      {displayName ? 'logout' : 'login'}
                    </Button>
                  </Fragment>
                );
              }}
            </AuthContext.Consumer>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
