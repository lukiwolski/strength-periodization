import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import { FirestoreContext } from '../../Firebase/Firestore';

class AddNew extends PureComponent {
  state = {
    open: false,
    exerciseName: null,
    repMax: null,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = callback => {
    this.setState({ open: false });

    if (callback) callback(this.state.exerciseName, this.state.repMax);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <Button onClick={this.handleClickOpen} variant="fab" color="secondary">
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Exercise</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Exercise Name"
              type="string"
              fullWidth
              onChange={this.handleChange('exerciseName')}
            />
            <TextField
              margin="dense"
              id="1rm"
              label="1 Rep Max"
              type="number"
              fullWidth
              helperText="KGs"
              onChange={this.handleChange('repMax')}
            />
          </DialogContent>
          <FirestoreContext.Consumer>
            {({ addExercise }) => (
              <DialogActions>
                <Button
                  onClick={() => this.handleClose(addExercise)}
                  color="primary"
                >
                  Confirm
                </Button>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            )}
          </FirestoreContext.Consumer>
        </Dialog>
      </Fragment>
    );
  }
}

AddNew.propTypes = {};

export default AddNew;
