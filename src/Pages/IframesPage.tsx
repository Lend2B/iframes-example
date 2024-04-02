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
      "https://chile-dev-abl-api.lend2b.com/get-access-token",
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

  // if (isLoading)
  //   return (
  //     <div className="w-full h-screen flex flex-col gap-2 items-center justify-center text-black text-xl ">
  //       Loading...
  //     </div>
  //   );

  if (!token) {
    return (
      <section className="w-full h-screen flex flex-col gap-3 items-center justify-center">
        <h1 className="font-semibold text-2xl">ABL login</h1>
        <Formik
          initialValues={{
            email: "callao-abl@yopmail.com",
            password: "Demo123*",
            entity_email: "client-dev@yopmail.com",
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
      <div className="flex flex-col items-center w-4/6 h-full">
        <iframe
          id={iframeId + "-creditStatus"}
          src={`https://chile-dev.lend2b.com/frame/CreditStatus?token=${token}`}
          className="w-full h-2/6"
        />
        <iframe
          id={iframeId + "-extensionsReport"}
          src={`https://chile-dev.lend2b.com/frame/ExtensionsReport?token=${token}`}
          className="w-full h-4/6"
        />
      </div>
      <div className="h-full w-2/6 ">
        <iframe
          id={iframeId + "-nextExpirations"}
          src={`https://chile-dev.lend2b.com/frame/NextExpirations?token=${token}`}
          className="w-4/6 h-full mx-auto"
        />
      </div>
    </section>
  );
};
