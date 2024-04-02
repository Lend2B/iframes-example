import * as Yup from "yup";

export const SignInValidation = Yup.object().shape({
  email: Yup.string().email().required("Username is required"),
  password: Yup.string().required("Password is required"),
  entity_email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
});
