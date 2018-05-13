import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  }),
});

function Overview(props) {
  const { classes } = props;
  return (
    <div className={styles.Overview}>
      <Paper className={classes.root}>
        <Typography variant="headline" component="h3">
          This will be the progress Overview Panel
        </Typography>
      </Paper>
    </div>
  );
}

Overview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Overview);
