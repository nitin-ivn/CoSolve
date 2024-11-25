import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './MyCard.css'
import { NavLink } from 'react-router-dom';

function MyCard(props) {
  return (
    <Card style={{ width: '22rem' }} className='animcard suce text-light img-thumbnail'>
      <Card.Img className='card-img' variant="top" src={props.post.image ? `${props.post.image}`:'/images/no-image.jpg'} />
      <Card.Body>
        <Card.Title className='text-center fs-2'>{props.post.title}</Card.Title>
        <Card.Text>
          Location: {props.post.location}<br />
          Status: <span className={props.post.status=='Active'?'text-success':'text-danger'}>{props.post.status}</span> 
        </Card.Text>
        <NavLink to={`/home/post/${props.post._id}`} className='w-100 btn btn-light'>Details</NavLink>
      </Card.Body>
    </Card>
  )
}

export default MyCard