import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import blue from 'material-ui/colors/blue';
import Button from 'material-ui/Button';

import { FirestoreContext } from '../Firebase/Firestore';

const styles = theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class ConfirmationModal extends React.Component {
  render() {
    const { classes, onClose, ...other } = this.props;

    return (
      <FirestoreContext.Consumer>
        {({ incrementSet }) => (
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="simple-dialog-title"
            {...other}
          >
            <DialogTitle id="simple-dialog-title">
              Confirm completing a set ?
            </DialogTitle>

            <Button
              variant="raised"
              color="primary"
              size="large"
              onClick={incrementSet}
              className={classes.button}
            >
              YES
            </Button>
            <Button
              variant="raised"
              color="secondary"
              onClick={this.props.onClose}
              className={classes.button}
            >
              Cancel
            </Button>
          </Dialog>
        )}
      </FirestoreContext.Consumer>
    );
  }
}

ConfirmationModal.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default withStyles(styles)(ConfirmationModal);
