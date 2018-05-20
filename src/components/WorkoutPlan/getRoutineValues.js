import {
  prop,
  without,
  head,
  compose,
  curry,
  either,
  chain,
  identity,
} from 'ramda';
import {
  categoryDetails,
  workoutCategories,
} from '../../configs/trainingTypes';
import { Either, Maybe } from 'ramda-fantasy';

const ERROR_MESSAGE = 'Something went wrong, selected exercise doesnt exist';

const INCREMENT_PER_CYCLE = 2.5;

const matchWorkoutPlan = curry((errorMessage, name, workoutPlan) => {
  return workoutPlan.hasOwnProperty(name)
    ? Either.of(workoutPlan[name])
    : Either.Left({ errorMessage });
});

const fallbackToFirst = either(identity, x => head(workoutCategories));

const removeFinished = curry((workoutCategories, category) =>
  without(category, workoutCategories)
);

const decideCategory = compose(
  fallbackToFirst,
  head,
  removeFinished(workoutCategories),
  prop('categoriesFinished')
);

const multiplyByCycles = (currentWorkout, categoryDetails) => {
  const { base } = currentWorkout;
  const { cyclesDone, singleRepMax } = categoryDetails;

  return cyclesDone > 0
    ? singleRepMax * (base + INCREMENT_PER_CYCLE * cyclesDone) / 100
    : singleRepMax * base / 100;
};

const buildRoutine = categoryDetails => workoutPlan => {
  const currentCategory = prop('currentCategory', workoutPlan);
  const currentWorkout = prop(currentCategory, categoryDetails);

  return {
    type: currentCategory,
    ...prop(currentCategory, categoryDetails),
    weight: multiplyByCycles(currentWorkout, workoutPlan),
  };
};

const addCurrentCategory = workoutPlan =>
  Maybe({
    ...workoutPlan,
    currentCategory: decideCategory(workoutPlan),
  });

const getRoutineValues = compose(
  chain(buildRoutine(categoryDetails)),
  chain(addCurrentCategory),
  matchWorkoutPlan(ERROR_MESSAGE)
);

export default getRoutineValues;
