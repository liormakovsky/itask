import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, createTask } from "./redux";
import { Table, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import moment from 'moment';

const TasksList = () => {
  const dispatch = useDispatch();

  const { isLoading, tasks } = useSelector((state) => state.tasksReducer);
  const user = useSelector((state) => state.userReducer.user); // Assuming you have user information in the userReducer
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleEdit = (taskId) => {
    // Handle edit logic here
    console.log(`Edit task with ID: ${taskId}`);
  };

  const handleDelete = (taskId) => {
    // Handle delete logic here
    console.log(`Delete task with ID: ${taskId}`);
  };

  const handleAddTask = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Task Name is required"),
    description: yup.string().required("Task Description is required"),
    due_date: yup.date().required("Due Date is required"),
  });

  const initialValues = {
    title: "",
    description: "",
    due_date: "",
  };

  const handleCreateTask = (values) => {
    dispatch(createTask(user.id, values));
    handleCloseModal();
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col lg={12}>
          <Button variant="success" onClick={handleAddTask}>
            Add Task
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Role</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <FaSpinner icon="spinner" className="spinner" />
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <span className="text-muted">Please insert your first task</span>
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.user && task.user.name}</td>
                    <td>{task.user && task.user.role}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{moment(task.due_date).format('DD-MM-YYYY')}</td>
                    <td>
                      <Button variant="info" size="sm" onClick={() => handleEdit(task.id)}>
                        Edit
                      </Button>{" "}
                      <Button variant="danger" size="sm" onClick={() => handleDelete(task.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCreateTask}
          >
            {({ values, handleChange, handleSubmit, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="due_date">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="due_date"
                    value={values.due_date}
                    onChange={handleChange}
                    isInvalid={!!errors.due_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.due_date}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button className="mt-2" variant="primary" type="submit">
                  Add Task
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TasksList;
