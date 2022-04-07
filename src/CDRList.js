import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState, getCdrCalls } from "./redux";
import { Table, Container, Row, Col } from "react-bootstrap";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { isLoading, cdr } = useSelector((state) => state.cdrReducer);

  useEffect(() => {
    dispatch(setInitialState());
    dispatch(getCdrCalls());
  }, []);

  if (isLoading) {
    return (
      <div className="loading d-flex justify-content-center align-items-center mt-5">
        <FaSpinner icon="spinner" className="spinner" />
      </div>
    );
  }

  if (cdr.length === 0) {
    return (
      <div className="loading d-flex justify-content-center align-items-center mt-5">
        <h1>Please upload a file</h1>
      </div>
    );
  }

  return (
    <>
      <Row>
        <Col lg={1}></Col>
        <Col lg={10}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Number of calls within same continent</th>
                <th>Total duration of calls within same continent</th>
                <th>Total number of all calls</th>
                <th>Total duration of all calls</th>
              </tr>
            </thead>
            <tbody>
              {cdr.map((call) => {
                return (
                  <tr key={call.customer_id}>
                    <td>{call.customer_id}</td>
                    <td>{call.total_calls_same_cont}</td>
                    <td>{call.total_duration_same_cont}</td>
                    <td>{call.total_calls}</td>
                    <td>{call.total_duration}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col lg={1}></Col>
      </Row>
    </>
  );
};

export default UpdateProduct;
