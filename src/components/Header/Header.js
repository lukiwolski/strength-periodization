import React, { PureComponent, Fragment } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

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
                      color="inherit"
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
