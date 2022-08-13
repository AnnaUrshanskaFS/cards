import { useState } from "react";
import PageHeader from "./common/pageHeader";
import { useFormik } from "formik";
/* import { useNavigate } from "react-router-dom"; */
import formikValidate from "../functions/formikvalidateJoi";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "./common/input";
import { toast } from "react-toastify";
import Joi from "joi";

import { useAuth } from "../context/authContext";

const SignIn = ({ redirect }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },

    validate: formikValidate({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).max(255).required(),
    }),

    async onSubmit(values) {
      try {
        await login(values);
        toast.success("You are signed in", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (redirect) {
          navigate(redirect);
        }
      } catch ({ response }) {
        if (response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <PageHeader title="Sign In Page" description="sign in to your account" />

      <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          label="Email"
          name="email"
          /* error={"input is invalid"} */ type="email"
          {...form.getFieldProps("email")}
          error={form.touched.email && form.errors.email}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          {...form.getFieldProps("password")}
          error={form.touched.password && form.errors.password}
        />
        <div className="my-4">
          <button type="submit" className=" btn btn-outline-primary">
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};
export default SignIn;
