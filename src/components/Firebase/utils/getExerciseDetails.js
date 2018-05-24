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
import { Either, Maybe } from 'ramda-fantasy';

const ERROR_MESSAGE = 'Something went wrong, selected exercise doesnt exist';

const INCREMENT_PER_CYCLE = 2.5;

const trainingBlocks = {
  hypertrophy: {
    sets: 3,
    reps: 8,
    base: 60,
  },
  power: {
    sets: 5,
    reps: 5,
    base: 70,
  },
  strength: {
    sets: 6,
    reps: 3,
    base: 80,
  },
};
const priorities = ['hypertrophy', 'power', 'strength'];

const matchWorkoutPlan = curry((errorMessage, name, workoutPlan) => {
  return workoutPlan.hasOwnProperty(name)
    ? Either.of(workoutPlan[name])
    : Either.Left({ errorMessage });
});

const fallbackToFirst = either(identity, x => head(priorities));

const removeFinished = curry((workoutCategories, category) =>
  without(category, workoutCategories)
);

const decideCategory = compose(
  fallbackToFirst,
  head,
  removeFinished(priorities),
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

const selectCurrentCategory = workoutPlan =>
  Maybe({
    ...workoutPlan,
    currentCategory: decideCategory(workoutPlan),
  });

// const getExerciseDetails = compose(
//   chain(buildRoutine(trainingBlocks)),
//   chain(selectCurrentCategory),
//   matchWorkoutPlan(ERROR_MESSAGE)
// );

const getExerciseDetails = (name, profile) => {
  const exerciseDetails = profile[name];
  const currentCategory = decideCategory(exerciseDetails);

  debugger;

  return {};
};

export default getExerciseDetails;
