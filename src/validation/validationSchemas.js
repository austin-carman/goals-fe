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

export const newGoalSchema = yup.object().shape({
  goal_title: yup.string().trim().required("Goal title is required"),
});

export const newStepsSchema = yup.object().shape({
  step_title: yup
    .string()
    .trim()
    .required("Step title is required for all steps"),
});
