import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import MyCard from '../Card/MyCard';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { userid } = useParams();
  const [activeTab, setActiveTab] = useState('posts');
  const { user } = useSelector(store => store.auth);
  const { posts } = useSelector(store => store.post);
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    if (userid) {
      const fetchAuthor = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/v1/user/${userid}/profile`, { withCredentials: true });
          if (res.data.success) {
            setAdmin(res.data.user);
          } else {
            console.log('Failed to fetch author');
          }
        } catch (error) {
          setError('Could not load author details');
          console.error(error);
        }
      };

      fetchAuthor();
    }
  }, [userid]);

  const [loggined, setLoggined] = useState(user._id === admin._id);
  useEffect(() => {
    setLoggined(user._id === admin._id);
  }, [admin, user._id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const calculateRating = () => {
    if (admin?.ratings?.length > 0) {
      const total = admin.ratings.reduce((sum, rating) => sum + rating, 0);
      const average = total / admin.ratings.length;
      return average.toFixed(1);
    } 
      return 4.5;

  };


  return (
    <div className="text-light slideleft mt-5">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-8">
          <div className="row mb-4">
            <div className="col-4 text-center">
              {admin.profilePicture ? (
                <img
                  className="profile"
                  src={admin.profilePicture}
                  style={{ width: '92px', height: '92px', borderRadius: '50%' }}
                  alt="profile"
                />
              ) : (
                <FaUser size={50} color="white" />
              )}

            </div>
            <div className="col-8">
              <div className="d-flex flex-column gap-1">
                <div className="d-flex align-items-center gap-2">
                  <h2 className="m-0">{admin.username}</h2>
                  {loggined && (
                    <NavLink to="/home/profileEdit" className="btn btn-sm btn-danger text-light">
                      Edit Profile
                    </NavLink>
                  )}

                </div>
                <p className='fs-4'>
                  Rating: <strong className={calculateRating()>3.5?'text-success':'text-danger'}>{calculateRating()}</strong>
                  <span className='ms-5'>{admin.posts?.length || 0} Post</span>
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div className="text-center mb-3">
            <button
              className={`btn text-light btn-link text-decoration-none ${activeTab === 'posts' ? 'fw-bold' : ''}`}
              onClick={() => handleTabChange('posts')}
            >
              POSTS
            </button>
            {loggined && (
              <button
                className={`btn text-light btn-link text-decoration-none ${activeTab === 'saved' ? 'fw-bold' : ''}`}
                onClick={() => handleTabChange('saved')}
              >
                SAVED
              </button>
            )}
          </div>
          <div className=" g-3">
            {activeTab === 'posts' ? (
              <div className="d-flex gap-4">
                {posts
                  .filter(post => post.author._id === admin._id)
                  .map(post => (
                    <MyCard key={post._id} post={post} />
                  ))}
              </div>
            ) : activeTab === 'saved' && loggined ? (
              <div className="d-flex gap-2">
                {admin.bookmarks.length > 0 ? (
                  admin.bookmarks.map(bookmark => (
                    <MyCard key={bookmark._id} post={bookmark} />
                  ))
                ) : (
                  <p>No bookmarks available</p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
