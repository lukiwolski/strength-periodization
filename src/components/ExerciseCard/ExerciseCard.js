import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import ConfirmationModal from './ConfirmationModal';

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class ExerciseCard extends PureComponent {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card} onClick={this.handleClickOpen}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              workout type
            </Typography>
            <Typography variant="headline" component="h2">
              Current set: 0/8
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Weight: 100kg
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Sets: 5
            </Typography>
          </CardContent>
        </Card>

        <ConfirmationModal
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

ExerciseCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExerciseCard);
