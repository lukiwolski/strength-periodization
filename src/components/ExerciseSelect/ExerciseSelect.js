import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { prop } from 'ramda';

import styles from './ExerciseSelect.module.css';
import { FirestoreContext } from '../Firestore/Firestore';
import AddNew from '../AddNew/AddNew';

class ExerciseSelect extends React.Component {
  state = {
    anchorEl: null,
    selectedIndex: 1,
  };

  button = undefined;

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index, selectExercise, exerciseList) => {
    selectExercise(exerciseList[index]);
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div className={styles.ExerciseSelect}>
        <FirestoreContext.Consumer>
          {({ currentExerciseValues, selectExercise, profile }) => {
            const { exerciseInProgress, isLocked } = currentExerciseValues;
            const exercises = prop('exercises', profile);

            const exerciseList = [
              'Select an exercise',
              ...(exercises ? exercises : []),
            ];

            return exerciseList.length > 1 ? (
              <div className={styles.ExerciseList}>
                <List component="nav">
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="When device is locked"
                    onClick={isLocked ? undefined : this.handleClickListItem}
                  >
                    <ListItemText
                      secondary={
                        isLocked
                          ? 'Please finish to change '
                          : 'Click to change'
                      }
                      primary={
                        exerciseInProgress
                          ? `Current Exercise: ${exerciseInProgress}`
                          : 'Select an exercise'
                      }
                    />
                  </ListItem>
                </List>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  {exerciseList.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 0}
                      selected={index === this.state.selectedIndex}
                      onClick={event =>
                        this.handleMenuItemClick(
                          event,
                          index,
                          selectExercise,
                          exerciseList
                        )
                      }
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ) : (
              <div className={styles.addText}>
                <Typography color="textSecondary">
                  Please Add some exercises to start
                </Typography>
              </div>
            );
          }}
        </FirestoreContext.Consumer>
        <div className={styles.AddIcon}>
          <AddNew />
        </div>
      </div>
    );
  }
}

export default ExerciseSelect;
