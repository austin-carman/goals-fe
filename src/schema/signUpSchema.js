import * as yup from "yup";

const signUpSchema = yup.object().shape({
  first_name: yup.string().trim().required("First name is required field"),
});

export default signUpSchema;
