import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';

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
