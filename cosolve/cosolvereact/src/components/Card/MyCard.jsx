import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './MyCard.css'
import { NavLink } from 'react-router-dom';

function MyCard(props) {
  return (
    <Card style={{ width: '18rem' }} className='animcard suce text-light img-thumbnail'>
      <Card.Img className='card-img' variant="top" src="https://picsum.photos/300" />
      <Card.Body className='card-body'>
        <Card.Title className='text-center fs-2'>{props.title}</Card.Title>
        <Card.Text>
          Location: Hyderabad<br />
          Status: Active 
        </Card.Text>
        {props.MyPost ? (
          <NavLink to='/home/post/1234' className='w-100 btn btn-light'>
            Details
          </NavLink>
        ) : (
          <button className='w-100 btn btn-success'>Completed</button>
        )}
      </Card.Body>
    </Card>
  )
}

export default MyCard