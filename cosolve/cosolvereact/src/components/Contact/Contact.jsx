import React from 'react'
import './contact.css'

function Contact() {
  return (
    <div className='d-flex text-light p-3 justify-content-center Contactpage'>

      <div className='d-flex flex-row mt-3 p-3 contact-con'>
        <div className='contact'>
          <h1>Contact</h1>
          <form action="feedback">
            <div className="floating-label-group pass-con">
                <img src="/icons/user.svg" className="username-img" alt="" />
                <input type="text" className="form-control custom-input" autoComplete="off" autoFocus required />
                <label className="floating-label">Name</label>
            </div>
            <div className="floating-label-group pass-con">
                <img src="/icons/mail.svg" className="username-img" alt="" />
                <input type="text" className="form-control custom-input" autoComplete="off" autoFocus required />
                <label className="floating-label">Email</label>
            </div>
            <div className="floating-label-group pass-con">
                <img src="/icons/book.svg" className="username-img" alt="" />
                <input type="text" className="form-control custom-input" autoComplete="off" autoFocus required />
                <label className="floating-label">Subject of problem</label>
            </div>
            <div className="floating-label-group pass-con">
                <textarea type='password' className="form-control custom-input txt-area" autoComplete="off" autoFocus required />
                <label className="floating-label">Description</label>
            </div>
            <div className='w-100 d-flex justify-content-center'>
            <input type="submit" className='btn btn-light w-50 mt-3 mb-5'/>
            </div>
         </form>
        </div>

        <div className='contact-per d-flex flex-column justify-content-center'>
          <h2>Contact Information</h2>
          <p className='m-0'>Guru Nanak Insitutions</p>
          <p className='m-0'>Ibrahimpatnam</p>
          <p className='mb-3'>Telangana</p>

          <p className='mb-3'>Call Us: 9102381923</p>

          <h2>Follow Us At: </h2>
          <div className='d-flex justify-content-around w-75 mt-2'>
            <img src="/icons/facebook.svg" alt="" />
            <img src="/icons/instagram.svg" alt="" />
            <img src="/icons/linkedin.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact