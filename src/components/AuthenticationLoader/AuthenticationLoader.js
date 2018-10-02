import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

import styles from './AuthenticationLoader.module.css';

const AuthenticationLoader = () => {
  return (
    <div>
      <CircularProgress />
      <Typography component="p" className={styles.progressText}>
        Logging in ...
      </Typography>
    </div>
  );
};

export default AuthenticationLoader;
