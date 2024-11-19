import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <Navbar expand="lg" variant="dark" style={{ backgroundColor: "transparent" }}>
      {/* style={{borderBottom: "1px solid black"}} */}
      <Container fluid>
        <Navbar.Brand href="#">CoSolve</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <Nav.Item className="me-5">
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "text-light" : "")}
                style={{ fontSize: "1.2rem" }}
              >
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item className="me-5">
              <NavLink
                to="/home/about"
                className={({ isActive }) => (isActive ? "text-light" : "")}
                style={{ fontSize: "1.2rem" }}
              >
                About
              </NavLink>
            </Nav.Item>
            <Nav.Item className="me-4">
              <NavLink
                to="/home/contact"
                className={({ isActive }) => (isActive ? "text-light" : "")}
                style={{ fontSize: "1.2rem" }}
              >
                Contact
              </NavLink>
            </Nav.Item>
          </Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="secondary" id="profile-dropdown">
              <img
                className="profile"
                src="https://picsum.photos/200"
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                alt="profile"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-dark">
              <Dropdown.Item>
                <NavLink
                  to="/home/create"
                  className={({ isActive }) => (isActive ? "text-light" : "")}
                >
                  Create Post
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink
                  to="/home/ongoing"
                  className={({ isActive }) => (isActive ? "text-light" : "")}
                >
                  Ongoing
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink
                  to="/home/profile"
                  className={({ isActive }) => (isActive ? "text-light" : "")}
                >
                  Profile
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink
                  to="/"
                  className="text-danger"
                >
                  LogOut
                </NavLink>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
