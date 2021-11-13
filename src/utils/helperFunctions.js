export const removeStep = (goal) => {
  const userGoal = { ...goal };
  const editedSteps = [...goal.steps];
  const index = editedSteps.length - 1;
  if (editedSteps[index].step_id) {
    const stepId = editedSteps[index].step_id;
    editedSteps.pop();
    userGoal.steps = editedSteps;
    return {
      stepId: stepId,
      userGoal: userGoal,
    };
  }
  editedSteps.pop();
  userGoal.steps = editedSteps;
  return userGoal;
};

export const sortGoals = (goalsArr) => {
  const sortedGoals = goalsArr.sort((a, b) => (a.goal_id > b.goal_id ? 1 : -1));
  return sortedGoals;
};

export const sortSteps = (stepsArr) => {
  const sortedSteps = stepsArr.sort((a, b) => (a.step_id > b.step_id ? 1 : -1));
  return sortedSteps;
};
