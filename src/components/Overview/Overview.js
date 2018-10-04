import React, { Fragment } from 'react';

import Firestore from '../Firestore/Firestore';
import ExerciseSelect from '../ExerciseSelect/ExerciseSelect';
import ExerciseCard from '../ExerciseCard/ExerciseCard';

const Overview = ({ forUser }) => (
  <Firestore user={forUser}>
    <Fragment>
      <ExerciseSelect />
      <ExerciseCard />
    </Fragment>
  </Firestore>
);

export default Overview;
