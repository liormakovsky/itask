import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./redux";
import { Table, Container, Row, Col } from "react-bootstrap";

const TasksList = () => {
  const dispatch = useDispatch();
  const { isLoading, tasks } = useSelector((state) => state.tasksReducer);

  useEffect(() => {
    // dispatch(getTasks());
  }, []);

  if (isLoading) {
    return (
      <div className="loading d-flex justify-content-center align-items-center mt-5">
        <FaSpinner icon="spinner" className="spinner" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="loading d-flex justify-content-center align-items-center mt-5">
        <h1>Please insert your first task</h1>
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
                <th>User Name</th>
                <th>Role</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                return (
                  <tr key={task.id}>
                    <td>{task.user_name}</td>
                    <td>{task.user_role}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.duedate}</td>
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

export default TasksList;
