import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux";
import { FaSpinner } from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.userReducer);

  const { name, email } = user;

  if (isLoading) {
    return (
      <div className="loading d-flex justify-content-center align-items-center mt-5">
        <FaSpinner icon="spinner" className="spinner" />
      </div>
    );
  }

  const initialValues = { name, email };
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Too Short!")
      .max(99, "Too Long!")
      .required("Name is required"),
    email: yup.string().email().required("Email is required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(updateUser(values));
        }}
      >
        {({ dirty, errors }) => (
          <Form className="col-4 offset-4">
            <h1>My Profile</h1>

            <div className="form-group mt-2">
              <label htmlFor="name">Full Name</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage
                name="name"
                component="span"
                className="text-danger"
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="span"
                className="text-danger"
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-primary mt-2"
              disabled={isLoading || !_.isEmpty(errors) || !dirty}
            >
              Update
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Profile;
