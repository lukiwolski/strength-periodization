import React, { PureComponent, Fragment } from 'react';
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
    this.setState({ open: true });
  };

  handleClose = value => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return <div>asd</div>;
  }
}

ExerciseCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExerciseCard);

// <SessionContext.Consumer>
//         {({ exerciseInProgress, type, setsDone, sets, weight }) => (
//           <Fragment>
//             <Card className={classes.card} onClick={this.handleClickOpen}>
//               <CardContent>
//                 <Typography className={classes.title} color="textSecondary">
//                   {type}
//                 </Typography>
//                 <Typography variant="headline" component="h2">
//                   Current set: {setsDone || 0} / {sets}
//                 </Typography>
//                 <Typography className={classes.pos} color="textSecondary">
//                   Weight: {weight}
//                 </Typography>
//                 <Typography className={classes.pos} color="textSecondary">
//                   Sets: {sets}
//                 </Typography>
//               </CardContent>
//             </Card>

//             <ConfirmationModal
//               open={this.state.open}
//               onClose={this.handleClose}
//             />
//           </Fragment>
//         )}
//       </SessionContext.Consumer>
