import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./redux";

const Header = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutUser());
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Itask</Navbar.Brand>
          <Nav className="me-auto navbar_wrapper">
            {user ? (
              <>
                <Link to="/tasks-list">Tasks</Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </Nav>
          {user ? (
            <Nav>
              <NavDropdown title={user && user.name}>
                <LinkContainer to="/profile" className="dropdown-item">
                  <NavItem>Profile</NavItem>
                </LinkContainer>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : null}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
