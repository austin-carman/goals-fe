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
