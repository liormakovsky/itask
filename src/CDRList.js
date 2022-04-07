import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState, getCdrCalls } from "./redux";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { isLoading, cdr } = useSelector((state) => state.cdrReducer);

  useEffect(() => {
    dispatch(setInitialState());
    dispatch(getCdrCalls());
    console.log(cdr);
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
