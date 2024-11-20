import React, {useState} from 'react'
import './editprofile.css'
import { FaUser } from 'react-icons/fa';
import MyCard from '../Card/MyCard';
import { NavLink } from 'react-router-dom';

function EditProfile() {
  const [file, setFile] = useState();
  function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className='p-4 text-light d-flex flex-column align-items-center'>
      <div className='d-flex w-100 justify-content-center'>
        <h1>Edit Your Profile</h1>
      </div>

      <hr className='w-50 bg-light text-light'/>
      <div className='edit-con d-flex flex-row justify-content-center'>
        <div className='profile-img pt-5'>
        <div className='prof-img'>
              <img src={file} className='img-fluid img-thumbnail prof-img' alt="" />
            </div>
            <label className='btn btn-light mt-3 ms-5' htmlFor='file-upload'>
              Upload Profile
            </label>
            <input type="file"
              id='file-upload'
              className='d-none'
              onChange={handleChange} />
        </div>

        <div className='profile-form d-flex flex-column align-items-center'>
          <div className="floating-label-group pass-con mb-3">
              <img src="/icons/user.svg" className="username-img" alt="" />
              <input type="text" className="form-control custom-input" autoComplete="off" autoFocus required />
              <label className="floating-label">Username</label>
          </div>

          <div className='d-flex flex-row gap-3'>
            <div className="floating-label-group pass-con mb-3">
                <img src="/icons/user.svg" className="username-img" alt="" />
                <input type="number" className="form-control custom-input-2" autoComplete="off" autoFocus required />
                <label className="floating-label">Phone Number</label>
            </div>
            <div class="floating-label-group mb-0">
                <img src="/icons/calendar.svg" class="username-img" alt="" />
                <input type="date" id="username" class="form-control custom-input-2 pe-1" autocomplete="off" autofocus required />
            </div>
          </div>

          <h3>Emergency Contact</h3>

          <div className="floating-label-group pass-con mb-3">
              <img src="/icons/user.svg" className="username-img" alt="" />
              <input type="text" className="form-control custom-input" autoComplete="off" autoFocus required />
              <label className="floating-label">Name</label>
          </div>

          <div className="floating-label-group pass-con mb-3">
              <img src="/icons/user.svg" className="username-img" alt="" />
              <input type="number" className="form-control custom-input" autoComplete="off" autoFocus required />
              <label className="floating-label">Phone Number</label>
          </div>


          <div className='w-25'>
            <button className='w-100 btn btn-light'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile