import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Protected = (props) => {
  const { user } = useSelector((state) => state.userReducer);

  const sid = Cookies.get("XSRF-TOKEN") || "";

  if (!user || !sid) {
    return <Navigate to="/login" />;
  }

  let Cmp = props.Cmp;
  return (
    <>
      <Cmp />
    </>
  );
};

export default Protected;
