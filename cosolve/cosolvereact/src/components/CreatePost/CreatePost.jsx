import React, { useState } from 'react'
import './createpost.css'

function CreatePost() {
  const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }


  return (
    <div className='text-light'>
      <div className='w-100 d-flex justify-content-center mt-4'>
      <h1 className=''>Create Post</h1>
      </div>
      <div className='d-flex overflow-hidden text-light p-3 justify-content-center gap-5'>
        <div className="post-image slideleft">
            <div className='img-preview'>
              <img src={file} className='img-fluid img-thumbnail preimg' alt="" />
            </div>
            <input type="file"
              className='mt-1 w-50'
              onChange={handleChange} />
        </div>
        <div className="post-details slideright d-flex flex-column align-items-center">
            <div className="floating-label-group pass-con mb-3">
                  <img src="/icons/user.svg" className="username-img" alt="" />
                  <input type="text" className="form-control custom-input" autoComplete="off" autoFocus required />
                  <label className="floating-label">Title</label>
              </div>
              <select name="category" className='custom-drp rounded-1 p-2' id="">
                <option value="1">Category</option>
                <option value="2">Transport</option>
                <option value="3">Rental</option>
                <option value="4">Skills</option>
              </select>
              <select name="location" className='custom-drp my-3 rounded-1 p-2' id="">
                <option value="1">Region</option>
                <option value="2">Ibrahimpatnam</option>
                <option value="3">Hyderabad</option>
                <option value="4">Secunderabad</option>
                <option value="5">L B Nagar</option>
              </select>
              <div className="floating-label-group pass-con">
                  <textarea type='password' className="form-control custom-input txt-area" autoComplete="off" autoFocus required />
                  <label className="floating-label">Description</label>
              </div>
        </div>
      </div>

      <div className='d-flex w-100 custom-slidedown justify-content-center mt-3'>
        <button className='btn btn-light w-25'>Create Post</button>
      </div>
    </div>
  )
}

export default CreatePost