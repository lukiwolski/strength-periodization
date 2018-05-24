import { prop, without, head, compose, curry, either, identity } from 'ramda';

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

const fallbackToFirst = either(identity, x => head(priorities));

const removeFinished = curry((workoutCategories, category) =>
  without(category, workoutCategories)
);

const decideCategory = compose(
  fallbackToFirst,
  head,
  removeFinished(priorities),
  prop('categoriesDone')
);

const multiplyByCycles = (baseWeight, categoryDetails) => {
  const { cyclesDone, singleRepMax } = categoryDetails;

  return cyclesDone > 0
    ? singleRepMax * (baseWeight + INCREMENT_PER_CYCLE * cyclesDone) / 100
    : singleRepMax * baseWeight / 100;
};

const getExerciseDetails = (name, workoutProfile) => {
  const currentExercise = prop(name, workoutProfile);
  if (!currentExercise) {
    return {
      errorMessage: ERROR_MESSAGE,
    };
  }

  const currentCategory = decideCategory(currentExercise);
  const { sets, reps, base } = trainingBlocks[currentCategory];

  return {
    sets,
    reps,
    exerciseInProgress: name,
    weight: multiplyByCycles(base, currentExercise),
    type: currentCategory,
  };
};

export default getExerciseDetails;
