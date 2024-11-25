import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import './ongoingcard.css'
import axios from 'axios';
import { useSelector } from 'react-redux';

function OngoingCardObj(props) {
  console.log("object")
  return (
    <Card style={{ width: '22rem' }} className='animcard suce text-light img-thumbnail'>
      <Card.Img className='card-img' variant="top" src={props.post.image ? `${props.post.image}`:'/images/no-image.jpeg'}/>
      <Card.Body>
        <Card.Title className='text-center fs-2'>{props.post.title}</Card.Title>
        <Card.Text>
          Location: {props.post.location}<br />
          Status:  {props.post.status} 
        </Card.Text>
        <button className='w-100 btn btn-light'>Completed</button>
        <button className='w-100 btn btn-light mt-2'>Remove</button>

      </Card.Body>
    </Card>
  )
}

export default OngoingCardObj

