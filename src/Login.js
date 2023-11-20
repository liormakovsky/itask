import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import _ from "lodash";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./redux";
import { FaSpinner } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, errors } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (user) {
      navigate("/tasks-list");
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="loading d-flex justify-content-center align-items-center mt-5">
        <FaSpinner icon="spinner" className="spinner" />
      </div>
    );
  }

  const initialValues = { email: "", password: "" };
  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(loginUser(values));
        }}
      >
        {({ dirty, errors }) => (
          <Form className="col-4 offset-4">
            <h1>Login</h1>
            <div className="form-group mt-2">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="span"
                className="text-danger"
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="span"
                className="text-danger"
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-primary mt-2"
              disabled={isLoading}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
      {errors && (
        <div className="d-flex justify-content-center align-items-center text-danger m-2">
          {errors.error ? errors.error : "Internal Error"}
        </div>
      )}
    </>
  );
};

export default Login;
