import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setAuthUser } from '../../redux/authSlice';
import './editprofile.css';

function EditProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract 'yyyy-MM-dd'
};

  const [input, setInput] = useState({
    username: user?.username || '',
    dateOfBirth: formatDate(user?.dateOfBirth) || '',
    phoneNumber: user?.phoneNumber || '',
    emergencyContact: {
      name: user?.emergencyContact?.name || '',
      phoneNumber: user?.emergencyContact?.phoneNumber || '',
    },
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('emergencyContact.')) {
      const field = name.split('.')[1];
      setInput((prev) => ({
        ...prev,
        emergencyContact: { ...prev.emergencyContact, [field]: value },
      }));
    } else {
      setInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file upload
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(user.profilePicture || '');

  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log(input);

    const formData = new FormData();
    formData.append('username', input.username);
    formData.append('dateOfBirth', input.dateOfBirth);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('emergencyContact[name]', input.emergencyContact.name);
    formData.append('emergencyContact[phoneNumber]', input.emergencyContact.phoneNumber);

    if (file) {
      formData.append('profilePhoto', file);
  }

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/user/profile/edit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success('Profile updated successfully!');
      } else {
        toast.error(res.data.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-4 text-light d-flex flex-column align-items-center">
      <div className="d-flex w-100 justify-content-center">
        <h1>Edit Your Profile</h1>
      </div>

      <hr className="w-50 bg-light text-light" />
      <div className="edit-con d-flex flex-row justify-content-center">
        {/* Profile Picture Section */}
        <div className="profile-img pt-5">
          <div className="prof-img overflow-hidden">
            {imagePreview && <img src={imagePreview} className='img-fluid img-thumbnail prof-img' alt='Preview' />}
          </div>
          <label className="btn btn-light mt-3 ms-4" htmlFor="file-upload">
            Upload Profile
          </label>
          <input
            type="file"
            id="file-upload"
            className="d-none"
            name="profilePhoto"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

        </div>

        {/* Form Section */}
        <div className="profile-form d-flex flex-column align-items-center ms-2">
          {/* Username */}
          <div className="floating-label-group pass-con mb-3">
            <img src="/icons/user.svg" className="username-img" alt="Username" />
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={handleInputChange}
              className="form-control custom-input"
              autoComplete="off"
              required
            />
            <label className="floating-label">Username</label>
          </div>

          {/* Phone Number and Date of Birth */}
          <div className="d-flex flex-row gap-3">
            <div className="floating-label-group pass-con mb-3">
              <img src="/icons/phone.svg" className="username-img" alt="Phone" />
              <input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={handleInputChange}
                className="form-control custom-input-2"
                autoComplete="off"
                required
              />
              <label className="floating-label">Phone Number</label>
            </div>
            <div className="dob">
              <img src="/icons/calendar.svg" className="username-img" alt="Date of Birth" />
              <input
                type="date"
                name="dateOfBirth"
                value={input.dateOfBirth}
                onChange={handleInputChange}
                className="form-control custom-input-2 pe-1 ps-1"
                autoComplete="off"
                required
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <h3>Emergency Contact</h3>
          <div className="floating-label-group pass-con mb-3">
            <img src="/icons/user.svg" className="username-img" alt="Contact Name" />
            <input
              type="text"
              name="emergencyContact.name"
              value={input.emergencyContact.name}
              onChange={handleInputChange}
              className="form-control custom-input"
              autoComplete="off"
              required
            />
            <label className="floating-label">Name</label>
          </div>
          <div className="floating-label-group pass-con mb-3">
            <img src="/icons/phone.svg" className="username-img" alt="Contact Phone" />
            <input
              type="text"
              name="emergencyContact.phoneNumber"
              value={input.emergencyContact.phoneNumber}
              onChange={handleInputChange}
              className="form-control custom-input"
              autoComplete="off"
              required
            />
            <label className="floating-label">Phone Number</label>
          </div>
          <div className='d-flex flex-row gap-4'>
            <label htmlFor="iden-upload" className=' btn btn-light'>Identity Proof</label>
            <input type="file"
              id='iden-upload'
              className='d-none' required/>

          <label htmlFor="Add-upload" className=' btn btn-light'>Address Proof</label>
            <input type="file"
              id='Add-upload'
              className='d-none' required/>
            </div>

          {/* Submit Button */}
          <div className="w-25 mt-3">
            <button onClick={handleSubmit} className="w-100 btn btn-light d-flex justify-content-center align-items-center submit" disabled={loading}>
              {loading ? ( ((<svg className='loading' viewBox="25 25 50 50">
                <circle r="10" cy="50" cx="50" className='home-circle'></circle></svg>))) : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
