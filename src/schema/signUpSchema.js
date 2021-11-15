import * as yup from "yup";

const signUpSchema = yup.object().shape({
  first_name: yup.string().trim().required("First name is required field"),
  last_name: yup.string().trim().required("Last name is required field"),
});

export default signUpSchema;
