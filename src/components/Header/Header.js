import React, { Fragment } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { prop } from 'ramda';

import { UserContext } from '../../contexts';

import styles from './Header.module.css';

function Header() {
  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <UserContext.Consumer>
            {({ user, handleSignOut, handleSignIn }) => {
              const displayName = prop('displayName', user);
              return (
                <Fragment>
                  <Typography component="p" color="inherit">
                    {displayName}
                  </Typography>

                  <Button
                    onClick={displayName ? handleSignOut : handleSignIn}
                    color="inherit"
                  >
                    {displayName ? 'logout' : 'login'}
                  </Button>
                </Fragment>
              );
            }}
          </UserContext.Consumer>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
