import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import MyCard from '../Card/MyCard';
import { NavLink } from 'react-router-dom';

function Profile() {
  return (
    <div className="text-light slideleft mt-5">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-8">
          <div className="row mb-4">
            <div className="col-4 text-center">
                <FaUser size={50} color="white" />
               
            </div>
            <div className="col-8">
              <div className="d-flex flex-column gap-1">
                <div className="d-flex align-items-center gap-2">
                  <h2 className="m-0">Gaddam Sriram</h2>
                  <NavLink 
                  to='/home/edit'
                  className="btn btn-danger btn-sm text-light">
                    Edit Profile
                  </NavLink>

                </div>
                <p className='fs-4'>Rating: <strong className='text-success'>4.5</strong> <span className='ms-5'>4 Posts</span></p>
              </div>
            </div>
          </div>
          <hr />
          <div className="text-center mb-3 ">
            <button
              className={`btn text-white btn-link`}
          
            >
              POSTS
            </button>
            <button
              className={`btn text-white btn-link`}
              
            >
              SAVED
            </button>
          </div>
          <div className="d-flex flex-row Myposts g-3 p-0">
            <div className="d-flex flex-row post-card">
            <MyCard title="Vehicle" />
            <MyCard title="Other" />
            <MyCard title="Volunteer" />
            <MyCard title="Volunteer" />
            <MyCard title="Volunteer" />
            </div>
          </div>
        </div>
      </div>
     </div>   
  );
};

export default Profile