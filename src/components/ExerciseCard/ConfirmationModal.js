import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Dialog, DialogTitle, Button } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

import { FirestoreContext } from '../Firestore/Firestore';

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
  handleSetIncrement = callback => {
    this.props.onClose();
    callback();
  };

  render() {
    const { classes, onClose, showFinalMessage, ...other } = this.props;

    return (
      <FirestoreContext.Consumer>
        {({ incrementSet }) => (
          <Dialog
            onClose={onClose}
            aria-labelledby="simple-dialog-title"
            {...other}
          >
            <DialogTitle id="simple-dialog-title">
              {showFinalMessage
                ? 'You have finished all sets'
                : 'Confirm completing a set ?'}
            </DialogTitle>

            <Button
              variant="raised"
              color="primary"
              size="large"
              onClick={() => this.handleSetIncrement(incrementSet)}
              className={classes.button}
            >
              YES
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
  showFinalMessage: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ConfirmationModal);
