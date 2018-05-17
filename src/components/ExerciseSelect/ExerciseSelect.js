import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import AddIcon from '@material-ui/icons/Add';
import Button from 'material-ui/Button';

import styles from './ExerciseSelect.module.css';
import { SessionContext } from '../../contexts';

class ExerciseSelect extends React.Component {
  state = {
    anchorEl: null,
    selectedIndex: 1,
  };

  button = undefined;

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index, updateSelectedStatus) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div className={styles.ExerciseSelect}>
        <SessionContext.Consumer>
          {({ exercises, updateSelectedStatus, incrementRep }) => {
            const exerciseList = ['Select an exercise', ...exercises];

            return (
              exerciseList.length > 1 && (
                <div className={styles.ExerciseList}>
                  <List component="nav">
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-controls="lock-menu"
                      aria-label="When device is locked"
                      onClick={this.handleClickListItem}
                    >
                      <ListItemText
                        secondary="Click to change"
                        primary={`Current Exercise: ${
                          exerciseList[this.state.selectedIndex]
                        }`}
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
                          this.handleMenuItemClick(event, index, updateSelectedStatus)
                        }
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              )
            );
          }}
        </SessionContext.Consumer>
        <div className={styles.AddIcon}>
          <Button variant="fab" color="secondary">
            <AddIcon />
          </Button>
        </div>;
      </div>
    );
  }
}

ExerciseSelect.propTypes = {
  exercises: PropTypes.array.isRequired,
};

export default ExerciseSelect;
