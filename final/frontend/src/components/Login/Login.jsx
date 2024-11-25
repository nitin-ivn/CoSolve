import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../../redux/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.auth);
  useEffect(() => {
    if(user){
      navigate("/home");
    }
  }, [])
  const [viewPassword, setViewPassword] = useState(false);
  const [regViewPassword, setRegViewPassword] = useState(false);
  const [regConfPassword, setRegConfPassword] = useState(false);
  const flipRef = useRef(null);

  const toggleFlip = (isRegister) => {
    if (flipRef.current) {
      flipRef.current.style.transform = isRegister
        ? "rotateY(-180deg)"
        : "rotateY(0deg)";
    }
  };
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });


  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
  });


  const handleLoginInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Register Input Change Handler
  const handleRegisterInputChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };



  const [loader , setLoader] = useState(false);

  const handleRegisterSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();

    const confirmPassword = e.target.confirmPassword.value;

    // Check if password and confirm password match
    if (registerData.password !== confirmPassword) {
      toast.error("Error,Re-enter the password again");
    } else {
      //Register api call
      try {
        const res = await  axios.post("http://localhost:8000/api/v1/user/register",registerData,{
          headers : {
            'Content-Type' : 'application/json'
          },
          withCredentials: true
        })
        if(res.data.success){
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
          setRegisterData({
            username: "",
            email: "",
            phoneNumber: "",
            dateOfBirth: "",
            password: "",
          });
          toggleFlip(false);
        } else {
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
        }
      } catch (error) {
        toast.error(error, {
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
        setLoader(false);
      }
    }
  };
  const handleLoginSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/login", loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log(res.data.success);
      if (res.data.success) {
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
        dispatch(setAuthUser(res.data.user));
        navigate("/home");
        setLoginData({
          email: "",
          password: "",
        });
      } else {
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
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.message || "Invalid username or password", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
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
    } finally {
      setLoader(false);
    }
  };
  

  return (
    <div className="page m-0">
      <div className="flip">
        <div className="flip-inner" ref={flipRef}>
          {/* Login Section */}
          <div className="login-container front mx-auto p-2">
            {/* courosel */}
            <div className="p-0 imgslide">
              <div
                id="carouselExampleRide"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="images/img5.jpg"
                      className="d-block w-100 com-img"
                      alt="..."
                    />
                    {/* <div className="carousel-caption d-none d-md-block">
                      <h5>First slide label</h5>
                      <p>Some representative placeholder content for the first slide.</p>
                    </div> */}
                  </div>
                  <div className="carousel-item">
                    <img
                      src="images/img6.jpg"
                      className="d-block w-100 com-img"
                      alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Second slide label</h5>
                      <p>Some representative placeholder content for the second slide.</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="images/img7.jpg"
                      className="d-block w-100 com-img"
                      alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Third slide label</h5>
                      <p>Some representative placeholder content for the third slide.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-0 login-form p-2 pt-4">
              <img src="/images/logo.png" className="logo-img" alt="" />
              <h1 className="msg">Welcome Back!</h1>
              <form onSubmit={handleLoginSubmit}>
                <div className="floating-label-group">
                  <img src="icons/user.svg" className="username-img" alt="" />
                  <input
                    type="text"
                    id="username"
                    className="form-control custom-input"
                    autoComplete="off"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginInputChange}
                    required
                  />
                  <label className="floating-label">Email</label>
                </div>
                <div className="floating-label-group pass-con">
                  <img src="icons/lock.svg" className="username-img" alt="" />
                  <input
                    type={viewPassword ? "text" : "password"}
                    id="password"
                    className="form-control custom-input"
                    autoComplete="off"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginInputChange}
                    required
                  />
                  <label className="floating-label">Password</label>
                  <img
                    src={viewPassword ? "icons/eye.svg" : "icons/eye-off.svg"}
                    className="password-view"
                    alt=""
                    onClick={() => setViewPassword(!viewPassword)}
                  />
                </div>
                <div className="ran">
                  <div>
                    <input type="checkbox" />
                    <label>Remember me</label>
                  </div>
                  <a href="#" className="forgot">
                    Forgot Password
                  </a>
                </div>
                <div className="btn-style mt-4">
                  <button type="submit" className="btn btn-dark submit d-flex flex-row justify-content-center align-items-center"
                  disabled= {loader}>
                    {loader ? (((<svg className='loading' viewBox="25 25 50 50">
                      <circle r="10" cy="50" cx="50" className='login-circle'></circle></svg>))) : "Login"}
                  </button>
                </div>
                <div className="text-center mt-2">
                  <p className="d-inline">Don't have an Account?</p>
                  <p className="reg" onClick={() => toggleFlip(true)}>
                    Register
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Register Section */}
          <div className="login-container back mx-auto p-2">
            <div className="p-0 imgslide">
              <div
                id="carouselExampleRide"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="images/img5.jpg"
                      className="d-block w-100 com-img"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="images/img6.jpg"
                      className="d-block w-100 com-img"
                      alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Second slide label</h5>
                      <p>Some representative placeholder content for the second slide.</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="images/img7.jpg"
                      className="d-block w-100 com-img"
                      alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Third slide label</h5>
                      <p>Some representative placeholder content for the third slide.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-0 login-form p-2 pt-0">
              <img src="/images/logo.png" className="logo-img" alt="" />
              <h1 className="msg mt-0">Hello!</h1>
              <form onSubmit={handleRegisterSubmit} action="register" className="reg1">
                <div className="d-flex flex-row inp">
                  <div className="floating-label-group mb-0">
                    <img src="icons/user.svg" className="username-img" alt="" />
                    <input
                      type="text"
                      id="regUsername"
                      name="username"
                      className="form-control me-2 custom-input-2"
                      value={registerData.username}
                      onChange={handleRegisterInputChange}
                      autoComplete="off"
                      required
                    />
                    <label className="floating-label">Username</label>
                  </div>
                  <div className="floating-label-group mb-0 d-inline">
                    <img src="icons/mail.svg" className="username-img" alt="" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control custom-input-2"
                      value={registerData.email}
                      onChange={handleRegisterInputChange}
                      autoComplete="off"
                      required
                    />
                    <label className="floating-label">Email</label>
                  </div>
                </div>
                <div className="mt-1 d-flex flex-row inp">
                  <div className="floating-label-group mb-0">
                    <img src="icons/phone.svg" className="username-img" alt="" />
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form-control custom-input-2 me-2"
                      value={registerData.phoneNumber}
                      onChange={handleRegisterInputChange}

                      autoComplete="off"
                      required
                    />
                    <label className="floating-label">Phone</label>
                  </div>
                  <div className="floating-label-group mb-0">
                    <img src="icons/calendar.svg" className="username-img" alt="" />
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      className="form-control custom-input-2 pe-1"
                      value={registerData.dateOfBirth}
                      onChange={handleRegisterInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="floating-label-group pass-con">
                  <img src="icons/lock.svg" className="username-img" alt="" />
                  <input
                    type={regViewPassword ? "text" : "password"}
                    id="regPassword"
                    name="password"
                    className="form-control custom-input"
                    autoComplete="off"
                    value={registerData.password}
                    onChange={handleRegisterInputChange}
                    required
                  />
                  <label className="floating-label">Password</label>
                  <img
                    src={regViewPassword ? "./icons/eye.svg" : "./icons/eye-off.svg"}
                    className="password-view"
                    alt=""
                    onClick={() => setRegViewPassword(!regViewPassword)}
                  />
                </div>
                <div className="floating-label-group pass-con">
                  <img src="icons/lock.svg" className="username-img" alt="" />
                  <input
                    type={regConfPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control custom-input"
                    autoComplete="off"
                    required
                  />
                  <label className="floating-label">Confirm Password</label>
                  <img
                    src={regConfPassword ? "icons/eye.svg" : "icons/eye-off.svg"}
                    className="password-view"
                    alt=""
                    onClick={() => setRegConfPassword(!regConfPassword)}
                  />
                </div>
                <div className="btn-style mt-4">
                  <button type="submit" className="btn btn-dark submit">
                    Register
                  </button>
                </div>
                <div className="text-center mt-2">
                  <p className="d-inline">Already have an Account?</p>
                  <p className="reg" onClick={() => toggleFlip(false)}>
                    Login
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
