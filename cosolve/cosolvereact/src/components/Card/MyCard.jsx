import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './MyCard.css'

function MyCard(props) {
  return (
    <Card style={{ width: '18rem' }} className='animcard suce text-light img-thumbnail'>
      <Card.Img className='card-img' variant="top" src="https://picsum.photos/300" />
      <Card.Body>
        <Card.Title className='text-center fs-2'>{props.title}</Card.Title>
        <Card.Text>
          Location: Hyderabad<br />
          Status: Active 
        </Card.Text>
        <Button className='w-100' variant="light">Details</Button>
      </Card.Body>
    </Card>
  )
}

export default MyCard