import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import router from "next/router";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/client";
import { Button } from "@mui/material";
import Link from "next/link";

import Layout from "components/common/Layout";
import Error from "components/common/Error";
import { signInSchema } from "libs/validation/schemas";
import { ROUTE } from "constants/route";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [errMsg, setErrMsg] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (values) => {
    setErrMsg("");
    try {
      const { error } = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password
      });

      if (error) {
        setErrMsg(error);
      } else {
        router.push(ROUTE.INDEX);
      }
    } catch (err) {
      const message = err.response?.data?.error || err.message;
      setErrMsg(message);
    }
  };

  return (
    <Layout>
      <section className="relative text-gray-600 body-font">
        <div className="container flex flex-col justify-center px-5 py-24 mx-auto">
          <div className="relative z-10 flex flex-col w-1/3 p-8 mx-auto mt-10 bg-white rounded-lg shadow-md">
            <h2 className="mb-1 text-lg font-medium text-gray-900 title-font">
              Sign in
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/*Email*/}
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="text-sm leading-7 text-gray-600"
                >
                  Email
                  <input
                    id="email"
                    {...register("email")}
                    className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300
                     rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </label>
                {errors.email && (
                  <Error message={errors.email.message}/>
                )}
              </div>
              {/*Password*/}
              <div className="relative mb-4">
                <label
                  htmlFor="message"
                  className="text-sm leading-7 text-gray-600"
                >
                  Password
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300
                     rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </label>
                {errors.password && (
                  <Error message={errors.password.message}/>
                )}
              </div>
              {/* Forgot password */}
              <div>
                <Link href={ROUTE.FORGOT_PASSWORD}>
                  <a className="block float-right">Forgot your password?</a>
                </Link>
              </div>
              {/*Submit*/}
              <Button
                type="submit"
                variant="contained"
                className="px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
              >
                Sign in
              </Button>
            </form>
            {/*Error*/}
            <Error message={errMsg}/>
          </div>
        </div>
      </section>
    </Layout>
  );
}
