import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './postpage.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { updateBookmarks, updateOngoing } from '../../redux/authSlice';
import { setPosts, updatePostStatus } from "../../redux/postSlice";
import { ToastContainer, toast } from 'react-toastify';
function PostPage() {
  const { postid } = useParams();
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();



  // Get the current post from the Redux store
  const post = posts.find((post) => post._id === postid);

  const [admin, setAdmin] = useState({});
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.bookmarks?.includes(post?._id)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, [user?.bookmarks, post?._id]);


  // Fetch author details
  useEffect(() => {
    if (post?.author) {
      const fetchAuthor = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/v1/user/${post.author._id}/profile`, { withCredentials: true });
          if (res.data.success) {
            setAdmin(res.data.user);
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

  // Bookmark handler
  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/post/${post?._id}/bookmark`, { withCredentials: true });
      if (res.data.success) {
        if (res.data.type === 'saved') {
          setIsBookmarked(true);
          dispatch(updateBookmarks({ postId: post?._id, isBookmarked: true }));
        } else if (res.data.type === 'unsaved') {
          setIsBookmarked(false);
          dispatch(updateBookmarks({ postId: post?._id, isBookmarked: false }));
        }
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
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/post/${post?._id}/delete`, { withCredentials: true });
      if (res.data.success) {
        const updatedPostData = posts.filter((postItem) => postItem?._id !== post?._id);
        dispatch(setPosts(updatedPostData));
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
        navigate('/home');
      } else{
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
      console.log(error);
    }
  };

  const editStatusHandler = async (postId, newStatus) => {
    try {
      // Make API request to update post status
      const res = await axios.put(
        `http://localhost:8000/api/v1/post/${postId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(updatePostStatus({ postId, status: newStatus }));
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
      console.error('Error updating post status:', error);
    }
  };

  const ongoingHandler = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/post/${post._id}/addongoing`,
        {}, // Empty request body
        { withCredentials: true }
      );

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
        dispatch(updateOngoing({ postId: post._id }));
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
      console.error('Error updating post status:', error);
    }
  };
  const [loggined, setLoggined] = useState(post.author._id == user._id);
  return (
    <div>
      <div className='w-100 d-flex justify-content-center text-light'>
          <h1>{post.title}</h1>
      </div>

      <div className='w-100 d-flex justify-content-center text-light'>
          <hr className='w-50 bg-light text-light'/>
      </div>
      <div className="d-flex position-relative text-light p-3 justify-content-center gap-5 postpage mt-4">
        <div className="detail p-4">
          <p className="fs-3 m-0">
            Posted By: <NavLink to={`/home/profile/${admin._id}`} className="user">{admin.username}</NavLink>
          </p>
          <h4 className="m-0">Location: Near {post.location}</h4>
          <h4>Status: <span className={post.status=='Active'?'text-success':'text-danger'}>{post.status}</span></h4>
          <h3 className="mt-5">Description: <p className="fs-4">{post.description}</p></h3>
        </div>
        <div className="post-img d-flex">
          <img className="img-fluid img-thumbnail" src={post.image ? `${post.image}`:'/images/no-image.jpg'} alt="" />
          {loggined && <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown-toggle">
              <img src="/icons/dots1.svg" alt="" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="custom-body">
              <Dropdown.Item onClick={deletePostHandler} className="drop-item text-danger">
                Delete Post
              </Dropdown.Item>
              <Dropdown.Item className="drop-item">
                <label className="text-light">Status:</label><br />
                <button onClick={() => editStatusHandler(post._id, 'Active')} className="btn btn-success me-1">Active</button>
                <button onClick={() => editStatusHandler(post._id, 'Closed')} className="btn btn-danger">Closed</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>}
        </div>
      </div>

      <div className="w-100 mt-5 d-flex justify-content-center button">
        <Accordion className="w-25" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={() => !loggined && ongoingHandler()} className="bg-dark">
              Confirm booking
            </Accordion.Header>
            <Accordion.Body className="book-det">
              <h4 className="fs-5">Phone Number: {admin.phoneNumber}</h4>
              <h4 className="fs-5">Email: {admin.email}</h4>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <button onClick={bookmarkHandler} className="bg-light border-1 ms-2 bookmark">
          <img className="book-img" src={isBookmarked ? '/icons/bookmark1.svg' : '/icons/bookmark.svg'} alt="" />
        </button>
      </div>
    </div>
  );
}

export default PostPage;
