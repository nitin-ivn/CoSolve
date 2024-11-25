import React, { useState } from 'react';
import './contact.css';
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';

function Contact() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subjectOfProblem: "",
    description: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const scriptURL = "https://script.google.com/macros/s/AKfycbxuH-MB_dwi5Uqo-6OM_GFzd_8Ej9dX41uGfmD8AyaZBwJSbxFxr0weBMA810N9ZdonVw/exec";

    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('subjectOfProblem', formData.subjectOfProblem);
    form.append('description', formData.description);

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: form
      });

      if (response.ok) {
        console.log('Success!', response);
        setFormData({
          name: "",
          email: "",
          subjectOfProblem: "",
          description: "",
        });
        toast.success('Message sent successfully', {
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
        toast.error("Failed to send message. Please try again.", {
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
      console.error('Error!', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='d-flex text-light p-3 justify-content-center Contactpage'>
      <div className='d-flex flex-row mt-3 p-3 contact-con'>
        <div className='contact'>
          <h1>Contact</h1>
          <form onSubmit={handleSubmit}>
            <div className="floating-label-group pass-con mb-4">
              <img src="/icons/user.svg" className="username-img" alt="" />
              <input
                type="text"
                className="form-control custom-input"
                name="name"
                value={formData.name}
                onChange={changeHandler}
                autoComplete="off"
                autoFocus
                required
              />
              <label className="floating-label">Name</label>
            </div>
            <div className="floating-label-group pass-con mb-4">
              <img src="/icons/mail.svg" className="username-img" alt="" />
              <input
                type="email"
                className="form-control custom-input"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                autoComplete="off"
                required
              />
              <label className="floating-label">Email</label>
            </div>
            <div className="floating-label-group pass-con mb-4">
              <img src="/icons/book.svg" className="username-img" alt="" />
              <input
                type="text"
                className="form-control custom-input"
                name="subjectOfProblem"
                value={formData.subjectOfProblem}
                onChange={changeHandler}
                autoComplete="off"
                required
              />
              <label className="floating-label">Subject of problem</label>
            </div>
            <div className="floating-label-group pass-con mb-4">
              <textarea
                className="form-control custom-input txt-area"
                name="description"
                value={formData.description}
                onChange={changeHandler}
                required
              />
              <label className="floating-label">Description</label>
            </div>
            <div className="w-100 d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-light w-50 mt-3 mb-5 d-flex justify-content-center align-items-center submit"
                disabled={loading}
              >
                {loading ? ((<svg className='loading' viewBox="25 25 50 50">
                      <circle r="10" cy="50" cx="50" className='home-circle'></circle></svg>)): "Submit"}
              </button>
            </div>
          </form>
          {message && <p className='text-center mt-3'>{message}</p>}
        </div>

        <div className="contact-per d-flex flex-column justify-content-center">
          <h2>Contact Information</h2>
          <p className="m-0">Guru Nanak Institutions</p>
          <p className="m-0">Ibrahimpatnam</p>
          <p className="mb-3">Telangana</p>
          <p className="mb-0">Call Us: 9102381923</p>
          <p className="mb-3">Email: cosolve52@gmail.com</p>
          <h2>Follow Us At: </h2>
          <div className="d-flex gap-3 w-75 mt-2 align-items-center">
            <BsTwitterX size={20} />
            <FaInstagram size={22} />
            <FaLinkedin size={22} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
