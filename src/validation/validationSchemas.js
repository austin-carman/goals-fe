import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  first_name: yup.string().trim().required("First name is required field"),
  last_name: yup.string().trim().required("Last name is required field"),
  username: yup
    .string()
    .trim()
    .required("username is a required field")
    .min(3, "username must be at least 3 characters in length"),
  password: yup
    .string()
    .trim()
    .required("password is a required field")
    .min(3, "password must be at least 3 characters in length"),
});

export const loginSchema = yup.object().shape({
  username: yup.string().trim().required("username is a required field"),
  password: yup.string().trim().required("password is a required field"),
});
