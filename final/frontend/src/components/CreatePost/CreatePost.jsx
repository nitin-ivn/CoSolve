import React, { useRef, useState } from 'react';
import axios from 'axios';
import './createpost.css';
import { ToastContainer, toast } from 'react-toastify';

function CreatePost() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handlePostSubmit = async () => {
    if (!title || !description || !category || !location) {
      console.error('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('location', location);
    if (file) formData.append('image', file);

    try {
      setLoading(true);

      const res = await axios.post('http://localhost:8000/api/v1/post/addpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

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
        // Reset form after successful post
        setFile(null);
        setTitle('');
        setDescription('');
        setCategory('');
        setLocation('');
        setImagePreview('');
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
      console.error(error);
      console.log(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='text-light'>
      <div className='w-100 d-flex justify-content-center mt-4'>
        <h1>Create Post</h1>
      </div>
      <div className='w-100 d-flex justify-content-center text-light'>
          <hr className='w-50 bg-light text-light'/>
      </div>
      <div className='d-flex overflow-hidden text-light p-3 justify-content-center gap-5'>
        <div className='post-image slideleft overflow-hidden'>
          <div className='img-preview  overflow-hidden'>
            {imagePreview && <img src={imagePreview} className='img-fluid img-thumbnail preimg' alt='Preview' />}
          </div>
          <input
            type='file'
            className='mt-1 w-50'
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div className='post-details slideright d-flex flex-column align-items-center'>
          <div className='floating-label-group pass-con mb-3'>
            <img src='/icons/user.svg' className='username-img' alt='User Icon' />
            <input
              type='text'
              className='form-control custom-input'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label className='floating-label'>Title</label>
          </div>
          <select
            name='category'
            className='custom-drp rounded-1 p-2'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=''>Category</option>
            <option value='Transport'>Transport</option>
            <option value='Rental'>Rental</option>
            <option value='Skills'>Skills</option>
          </select>
          <select
            name='location'
            className='custom-drp my-3 rounded-1 p-2'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value=''>Region</option>
            <option value='Ibrahimpatnam'>Ibrahimpatnam</option>
            <option value='Hyderabad'>Hyderabad</option>
            <option value='Secunderabad'>Secunderabad</option>
            <option value='L B Nagar'>L B Nagar</option>
          </select>
          <div className='floating-label-group pass-con'>
            <textarea
              className='form-control custom-input txt-area'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label className='floating-label'>Description</label>
          </div>
        </div>
      </div>

      <div className='d-flex w-100 custom-slidedown justify-content-center mt-3 submit alingn-items-center'>
        <button
          className='btn btn-light w-25'
          onClick={handlePostSubmit}
          disabled={loading}
        >
          {loading ? ( ((<svg className='loading' viewBox="25 25 50 50">
            <circle r="10" cy="50" cx="50" className='home-circle'></circle></svg>))) : 'Create Post'}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
