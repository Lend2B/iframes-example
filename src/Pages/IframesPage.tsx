import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useId, useState } from "react";
import { Input } from "../Components/Input";
import { SignInValidation } from "../helpers/FormValidations";
import axios from "axios";

interface Props {
  email: string;
  password: string;
  entity_email: string;
}

export const IframePages = () => {
  const [token, setToken] = useState<string>("");
  const iframeId = useId();

  const getAccessToken = async (values: Props) => {
    const response = await axios.post(
      `${import.meta.env["VITE_ABL_ENDPOINT"]}/get-access-token`,
      {
        ...values,
      },
      {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    return response.data;
  };

  const { isPending, mutate } = useMutation({
    mutationFn: getAccessToken,
    onSuccess(data) {
      setToken(data?.token);
    },
  });

  if (!token) {
    return (
      <section className="w-full h-screen flex flex-col gap-3 items-center justify-center">
        <h1 className="font-semibold text-2xl">Insert Credentials</h1>
        <Formik
          initialValues={{
            email: "callao-abl@yopmail.com",
            password: "Demo123*",
            entity_email: "client-stage@yopmail.com",
          }}
          validationSchema={SignInValidation}
          onSubmit={mutate}
        >
          <Form className="w-full flex flex-col items-center gap-3 ">
            <Input name="email" type="text" label="Email" placeholder="email" />

            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
            />

            <Input
              name="entity_email"
              type="email"
              label="Entity Email"
              placeholder="Entity Email"
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
  }

  return (
    <section className="w-full h-screen flex  justify-center items-center p-10">
      <div className="flex flex-col items-center  w-5/6 h-full">
        <iframe
          id={iframeId + "-creditStatus"}
          src={`${
            import.meta.env["VITE_ENDPOINT"]
          }/CreditStatus?token=${token}`}
          height="180px"
          width="1000px"
          // className="w-full"
        />
        <iframe
          id={iframeId + "-extensionsReport"}
          src={`${
            import.meta.env["VITE_ENDPOINT"]
          }/ExtensionsReport?token=${token}`}
          width="1000px"
          height="500px"
          // className="w-full h-4/6"
        />
      </div>
      <div className="h-full ">
        <iframe
          id={iframeId + "-nextExpirations"}
          src={`${
            import.meta.env["VITE_ENDPOINT"]
          }/NextExpirations?token=${token}`}
          width="300px"
          height="420px"
          className="m-auto"
        />
      </div>
    </section>
  );
};
