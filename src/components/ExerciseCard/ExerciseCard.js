import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardContent, Typography } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import ConfirmationModal from './ConfirmationModal';
import { FirestoreContext } from '../Firebase/Firestore';
import RemoveExerciseModal from './RemoveExerciseModal';

const styles = {
  card: {
    minWidth: 275,
    marginTop: 16,
  },
  title: {
    fontSize: 14,
    lineHeight: '32px',
  },
  pos: {
    marginBottom: 12,
    marginTop: 12,
    fontSize: 18,
  },
  count: {
    marginRight: 6,
    display: 'inline-block',
  },
  countTextContainer: {
    position: 'relative',
  },
  iconWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 80,
    height: 40,
    display: 'flex',
    'align-items': 'flex-end',
    'justify-content': 'flex-end',
    'z-index': 10,
  },
};

class ExerciseCard extends PureComponent {
  state = {
    confirmModalopen: false,
    removeExerciseModalOpen: false,
  };

  handleOpenModal = modalName => {
    this.setState({ [modalName]: true });
  };

  handleCloseModal = (modalName, event) => {
    this.setState({ [modalName]: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <FirestoreContext.Consumer>
        {({
          workoutDetails: {
            exerciseInProgress,
            type,
            setsDone,
            sets,
            weight,
            reps,
          },
          removeExercise,
        }) => (
          <Fragment>
            {exerciseInProgress && (
              <Card
                className={classes.card}
                onClick={() => this.handleOpenModal('confirmModalopen')}
              >
                <CardContent>
                  <Typography className={classes.title} color="textSecondary">
                    Workout Type: {type}
                  </Typography>
                  <Typography variant="headline" component="h2">
                    Current set: {setsDone + 1} / {sets}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    Weight {weight}
                  </Typography>
                  <div className={classes.countTextContainer}>
                    <Typography className={classes.count} color="textSecondary">
                      Sets {sets} x
                    </Typography>
                    <Typography className={classes.count} color="textSecondary">
                      Reps: {reps}
                    </Typography>
                    <div
                      className={classes.iconWrapper}
                      onClick={e => {
                        e.stopPropagation();
                        this.handleOpenModal('removeExerciseModalOpen');
                      }}
                    >
                      <DeleteIcon />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <ConfirmationModal
              open={this.state.confirmModalopen}
              onClose={() => this.handleCloseModal('confirmModalopen')}
              showFinalMessage={setsDone + 1 === sets}
            />

            <RemoveExerciseModal
              open={this.state.removeExerciseModalOpen}
              onClose={() => this.handleCloseModal('removeExerciseModalOpen')}
              removeExercise={removeExercise}
            />
          </Fragment>
        )}
      </FirestoreContext.Consumer>
    );
  }
}

ExerciseCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExerciseCard);
