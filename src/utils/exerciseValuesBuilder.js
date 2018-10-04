import { prop, without, head, compose, curry, either, identity } from 'ramda';

const ERROR_MESSAGE = 'Something went wrong, selected exercise doesnt exist';

// Exercise volume increase after each cycle
const INCREMENT_PER_CYCLE = 2.5;

// Predefined values for each training type from Prilipins chart
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

export const priorities = ['hypertrophy', 'power', 'strength'];

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

const multiplyByCycles = (prilipinsPercentage, categoryDetails) => {
  const { cyclesDone, singleRepMax } = categoryDetails;

  return cyclesDone > 0
    ? (singleRepMax *
        (prilipinsPercentage + INCREMENT_PER_CYCLE * cyclesDone)) /
        100
    : (singleRepMax * prilipinsPercentage) / 100;
};

export const getExerciseValues = (name, workoutProfile) => {
  const currentExercise = prop(name, workoutProfile);
  if (!currentExercise) {
    return {
      errorMessage: ERROR_MESSAGE,
    };
  }

  const currentCategory = decideCategory(currentExercise);
  const { sets, reps, base } = prop(currentCategory, trainingBlocks);

  return {
    sets,
    reps,
    weight: multiplyByCycles(base, currentExercise),
    type: currentCategory,
  };
};

const NUMBER_OF_CATEGORIES = priorities.length - 1; // wtf ?
export const checkIfShouldIncrementCycles = categoriesDone =>
  categoriesDone.length === NUMBER_OF_CATEGORIES;
