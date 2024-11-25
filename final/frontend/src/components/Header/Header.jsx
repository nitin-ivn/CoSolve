import axios from 'axios';
import './header.css'
import React, { useState } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setSelectedPost } from '../../redux/postSlice';
import { setAuthUser } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
function Header() {
  const [logging, setLogging] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  const logoutHandler = async () => {
    setLogging(true);
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    } catch (error) {
      toast.error(res.data.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } finally {
      setLogging(false);
    }
  }

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
                to="/home"
                className='text-light text-decoration-none'
                style={{ fontSize: "1.2rem" }}
              >
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item className="me-5">
              <NavLink
                to="/home/about"
                className={({ isActive }) => (isActive ? "link active" : "link")}
                style={{ fontSize: "1.2rem" }}
              >
                About
              </NavLink>
            </Nav.Item>
            <Nav.Item className="me-4">
              <NavLink
                to="/home/contact"
                className={({ isActive }) => (isActive ? "link active" : "link")}
                style={{ fontSize: "1.2rem" }}
              >
                Contact
              </NavLink>
            </Nav.Item>

            <Nav.Item className="ms-3">
              <NavLink
                to='/home/create'
                className={({ isActive }) => (isActive ? "link active" : "link")}
                style={{ fontSize: "1.2rem" }}
              >
                Create Post
              </NavLink>
            </Nav.Item>
          </Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="secondary" id="profile-dropdown">
              {user.profilePicture ? (
                <img
                  className="profile"
                  src={user.profilePicture}
                  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                  alt="profile"
                />
              ) : (
                <FaUser size={26} color="white" />
              )}

            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-dark">
              

              <Dropdown.Item>
                <NavLink
                  to="/home/ongoing"
                  className="link-prim"
                >
                  Ongoing
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink
                  to={`/home/profile/${user._id}`}
                  className="link-prim"
                >
                  Profile
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink
                  onClick={logoutHandler}
                  className="text-danger text-decoration-none"
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
