import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import './ongoingcard.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {removeOngoing } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
function OngoingCardid(props) {
  const dispatch = useDispatch();
  const { posts } = useSelector(store=>store.post);

  const post = posts?.find((post) => post._id === props.post);

  const navigate = useNavigate();
    const completeOngoingHandler = () => {
        navigate(`/home/ongoing/rating/${post._id}`);
    }

  const removeOngoingHandler = async ()=>{
    try{
      const res = await axios.put(`http://localhost:8000/api/v1/post/${post._id}/removeongoing`,{},{ withCredentials: true });
      if(res.data.success){
        toast.success(res.data.message);
        dispatch(removeOngoing({ postId: post._id }));
      } else {
        toast.error(res.data.message);
      }

    }catch(error){
      console.log(error);
    }
  }

  return (
    <Card style={{ width: '22rem' }} className='animcard suce text-light img-thumbnail'>
      <Card.Img className='card-img' variant="top" src={post.image ? `${post.image}`:'/images/no-image.jpeg'}/>
      <Card.Body>
        <Card.Title className='text-center fs-2'>{post.title}</Card.Title>
        <Card.Text>
          Location: {post.location}<br />
          Status:  <span className={post.status=='Active'?'text-success':'text-danger'}>{post.status}</span>
        </Card.Text>
        <button onClick={completeOngoingHandler} className='w-100 btn btn-light'>Completed</button>
        <button onClick={removeOngoingHandler} className='w-100 btn btn-light mt-2'>Remove</button>

      </Card.Body>
    </Card>
  )
}

export default OngoingCardid