import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, createTask, updateTask, deleteTask } from "./redux";
import { Table, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import moment from 'moment';

const TasksList = () => {
  const dispatch = useDispatch();

  const { isLoading, tasks } = useSelector((state) => state.tasksReducer);
  const user = useSelector((state) => state.userReducer.user);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Added currentPage state
  const tasksPerPage = 5; // Adjust the number of tasks per page as needed
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getTasks(user.id));
  }, [dispatch, user.id]);

  const handleEdit = (task) => {
    // Format the due_date to match the format expected by the date input
    const formattedDueDate = moment(task.due_date).format('YYYY-MM-DD');

    // Create a new task object with the formatted due_date
    const editedTask = { ...task, due_date: formattedDueDate };

    setSelectedTask(editedTask);
    setShowEditModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedTask(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedTask(null);
  };

  const handleAddTask = () => {
    setShowAddModal(true);
  };

  const handleCreateTask = (values) => {
    dispatch(createTask(user.id, values));
    handleCloseAddModal();
  };

  const handleUpdateTask = async (values) => {
    const taskId = selectedTask.id;
    await dispatch(updateTask(taskId, values));
    handleCloseEditModal();
  };

  const handleDelete = (task) => {
    setSelectedTask(task); // Set the entire task object
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTask) {
      dispatch(deleteTask(selectedTask)); // Access the ID directly
    }
    handleCloseDeleteModal();
  };

  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearchTerm(e.target.value);
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


  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstTask, indexOfLastTask);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Container>
      {/* Add Task Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ title: "", description: "", due_date: "" }}
            validationSchema={yup.object().shape({
              title: yup.string().required("Task Name is required"),
              description: yup.string().required("Task Description is required"),
              due_date: yup.date().required("Due Date is required"),
            })}
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

      {/* Edit Task Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              title: selectedTask?.title || "",
              description: selectedTask?.description || "",
              due_date: selectedTask?.due_date || "",
            }}
            validationSchema={yup.object().shape({
              title: yup.string().required("Task Name is required"),
              description: yup.string().required("Task Description is required"),
              due_date: yup.date().required("Due Date is required"),
            })}
            onSubmit={handleUpdateTask}
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
                  Update Task
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      {/* Delete Task Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the task?</p>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Confirm Delete
          </Button>
        </Modal.Body>
      </Modal>

      <Row className="mt-3">
        <Col lg={6}>
          <Button variant="success" onClick={handleAddTask}>
            Add Task
          </Button>
        </Col>

        {/* Filter*/}

        <Col lg={6} className="d-flex justify-content-end">
          <Form.Group controlId="searchTerm">
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
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
                currentTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.user && task.user.name}</td>
                    <td>{task.user && task.user.role}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{moment(task.due_date).format('DD-MM-YYYY')}</td>
                    <td>
                      <Button variant="info" size="sm" onClick={() => handleEdit(task)}>
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
          {/* Pagination */}
          <ul className="pagination">
            {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, index) => (
              <li key={index} className={`page-item ${index + 1 === currentPage ? "active" : ""}`}>
                <span onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </span>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default TasksList;
