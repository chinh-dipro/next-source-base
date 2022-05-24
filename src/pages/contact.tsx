import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import Layout from "components/common/Layout";
import { contactSchema } from "libs/validation/schemas";
import Error from "components/common/Error";

type FormData = {
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(contactSchema),
  });
  const onSubmit = (values) => {
    // TODO: Implement logic here
    console.log(values);
  };

  return (
    <Layout>
      <section className="relative text-gray-600 body-font">
        <div className="container flex flex-col justify-center px-5 py-24 mx-auto">
          <div className="relative z-10 flex flex-col w-1/3 p-8 mx-auto mt-10 bg-white rounded-lg shadow-md">
            <h2 className="mb-1 text-lg font-medium text-gray-900 title-font">
              Feedback
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="mb-5 leading-relaxed text-gray-600">
                Drop us a message if you have any feedback.
              </p>
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
                  <Error message={errors.email.message} />
                )}
              </div>
              {/*Message*/}
              <div className="relative mb-4">
                <label
                  htmlFor="message"
                  className="text-sm leading-7 text-gray-600"
                >
                  Message
                  <textarea
                    id="message"
                    {...register("message")}
                    className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white
                    border border-gray-300 rounded outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    defaultValue=""
                  />
                </label>
                {errors.message && (
                  <Error message={errors.message.message} />
                )}
              </div>
              {/*Submit*/}
              <Button
                type="submit"
                variant="contained"
                className="px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
