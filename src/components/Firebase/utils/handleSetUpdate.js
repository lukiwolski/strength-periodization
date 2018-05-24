const handleSetUpdate = workoutState => {
  const { sets, setsDone } = workoutState;

  return setsDone < sets
    ? {
        setsDone: setsDone + 1,
        isLocked: true,
      }
    : {
        clearState: true,
      };
};

export default handleSetUpdate;
