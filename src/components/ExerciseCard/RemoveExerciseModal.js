import React, { Component } from 'react';
import { Dialog, DialogTitle, Button } from '@material-ui/core';

class RemoveExerciseModal extends Component {
  handleButtonClick = () => {
    const { removeExercise, onClose } = this.props;

    removeExercise();
    onClose();
  };

  render() {
    const { onClose, open } = this.props;
    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          Are you sure you want to remove the exercise ? All progress will be
          lost!
        </DialogTitle>

        <Button
          variant="raised"
          color="primary"
          size="large"
          onClick={this.handleButtonClick}
        >
          YES
        </Button>
      </Dialog>
    );
  }
}

export default RemoveExerciseModal;
