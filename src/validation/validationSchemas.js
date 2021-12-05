import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  first_name: yup.string().trim().required("First name is required"),
  last_name: yup.string().trim().required("Last name is required"),
  username: yup
    .string()
    .trim()
    .required()
    .min(3, "username must be at least 3 characters in length"),
  password: yup
    .string()
    .trim()
    .required()
    .min(3, "password must be at least 3 characters in length"),
});

export const loginSchema = yup.object().shape({
  username: yup.string().trim().required("username is required"),
  password: yup.string().trim().required("password is required"),
});

export const goalValidation = async (goal) => {
  const steps = goal.steps;
  const stepTitleErrors = {};
  if (goal.goal_title.trim() === "") {
    return "Goal Title is required";
  }
  steps.forEach((step, index) => {
    if (step.step_title.trim() === "") {
      stepTitleErrors[index + 1] = "Step Title is required";
    }
  });
  for (const stepNumber in stepTitleErrors) {
    return `Step ${stepNumber} title is required`;
  }
};
