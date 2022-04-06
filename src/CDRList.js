import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState } from "./redux";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.cdrReducer);

  useEffect(() => {
    dispatch(setInitialState());
  }, []);

  if (isLoading) {
    return (
      <div className="loading d-flex justify-content-center align-items-center mt-5">
        <FaSpinner icon="spinner" className="spinner" />
      </div>
    );
  }

  return (
    <>
      <h1>Update page</h1>;
    </>
  );
};

export default UpdateProduct;
