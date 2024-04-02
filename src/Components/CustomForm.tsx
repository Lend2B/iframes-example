import { Form, Formik } from "formik";
import { SignInValidation } from "../helpers/FormValidations";
import { Input } from "./Input";
import { useMutation } from "@tanstack/react-query";

export const CustomForm = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: async (values: { username: string; password: string }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(values);
        }, 2000);
      });
    },
  });

  return (
    <section className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <h1 className="font-semibold text-2xl">ABL login</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
          email_to_get_token: "",
        }}
        validationSchema={SignInValidation}
        onSubmit={mutate}
      >
        <Form className="w-full flex flex-col items-center gap-3 ">
          <Input
            name="username"
            type="text"
            label="Username"
            placeholder="Username"
          />

          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
          />

          <Input
            name="email_to_get_token"
            type="email"
            label="Email to get token"
            placeholder="Email to get token"
          />

          <button
            type="submit"
            className="bg-blue-500 p-2 w-1/6 rounded-lg text-white hover:bg-blue-700 transition-all ease-in-out duration-150 mt-1"
          >
            {isPending ? <span>Loading ...</span> : <span>Sign In</span>}
          </button>
        </Form>
      </Formik>
    </section>
  );
};
