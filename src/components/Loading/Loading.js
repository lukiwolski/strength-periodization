import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Loading.module.css';

const Loading = () => (
  <div className={styles.Loading}>
    <CircularProgress />
  </div>
);

export default Loading;
