import React, { useEffect, useState } from 'react';
import './rating.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { removeOngoing } from '../../redux/authSlice';

function Rating() {
  const dispatch = useDispatch();
  const { postid } = useParams();
  const navigate = useNavigate();

  const { posts } = useSelector(store => store.post);
  const post = posts?.find((post) => post._id === postid);

  const [user, setUser] = useState({});
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const closeHandler = () => {
    navigate('/home/ongoing');
  };

  useEffect(() => {
    if (post?.author) {
      const fetchAuthor = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/v1/user/${post.author._id}/profile`, { withCredentials: true });
          if (res.data.success) {
            setUser(res.data.user);
          } else {
            throw new Error('Failed to fetch author');
          }
        } catch (error) {
          console.error(error);
          toast.error('Could not load author details');
        }
      };

      fetchAuthor();
    }
  }, [post?.author]);

  const addReview = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/post/${post._id}/rating`,
        {
          reviewedUserId: user._id,
          rating,
          comment,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(removeOngoing({ postId: post._id }));
        navigate('/home/ongoing'); // Redirect to completed tasks
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit review');
    }
  };

  return (
    <div className="back-cus">
      <div className="rating-container p-3 ps-3">
        <div className="d-flex flex-column align-items-center">
          <button onClick={closeHandler} className="p-0 m-0 close border-0">
            X
          </button>
          <div className="w-100 d-flex flex-row justify-content-center">
            <h1>Give Rating for {user.username}</h1>
          </div>

          <div className="w-100 d-flex flex-row justify-content-center">
            <hr className="w-75 bg-dark" />
          </div>

          <div>
            <label htmlFor="rating" className="fs-4 me-3">
              Rating:
            </label>
            <select
              name="rating"
              className="cus-rating rounded-1 p-2"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="2.5">2.5</option>
              <option value="3">3</option>
              <option value="3.5">3.5</option>
              <option value="4">4</option>
              <option value="4.5">4.5</option>
              <option value="5">5</option>
            </select>
          </div>

          <div>
            <textarea
              name="comment"
              placeholder="Feedback"
              className="custom-feed mt-3 p-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button className="btn btn-light" onClick={addReview}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;
