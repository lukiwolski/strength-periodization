import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import blue from 'material-ui/colors/blue';
import Button from 'material-ui/Button';

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
  handleClose = () => {
    this.props.onClose();
  };

  handleConfirmClick = () => {};

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
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
          onClick={this.handleListItemClick}
          className={classes.button}
        >
          YES
        </Button>
        <Button
          variant="raised"
          color="secondary"
          onClick={this.handleClose}
          className={classes.button}
        >
          No
        </Button>
      </Dialog>
    );
  }
}

ConfirmationModal.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(ConfirmationModal);
