import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './postpage.css'
import { useParams } from 'react-router-dom'

function PostPage() {
  const postId = useParams();
    

  return (
    <div>
        <div className='d-flex text-light p-3 justify-content-center gap-5'>
          <div className="detail p-4">
            <h1>Service: Volunteer</h1>
            <p className='fs-3 m-0'>Posted By: <a className='user'>User245</a></p>
            <h4 className='m-0'>Location: Near SBI Bank, Ibrahimpatnam</h4>
            <h4>Status: <span className='text-success'>Active</span></h4>
            <h3 className='mt-5'>Description: <p className='fs-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quidem quibusdam voluptas quisquam distinctio expedita repudiandae corrupti facilis, delectus alias! Delectus maxime voluptatibus neque quos!\ ipsum dolor sit amet consectetur adipisicing elit. Eum rerum sed esse praesentium, aliquam velit!</p></h3>
          </div>
          <div className="post-img">
              <img className='img-fluid img-thumbnail' src="https://picsum.photos/700/500" alt="" />
          </div>
        </div>

        <div className='w-100 mt-3 d-flex justify-content-center button'>
            <Accordion className='w-25' flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header className='bg-dark'>Confirm booking</Accordion.Header>
                <Accordion.Body className='book-det'>
                    <h4 className='fs-5'>Phone Number: 9018203981</h4>
                    <h4 className='fs-5'>Email: lol@gmail.com</h4>
                    <h4 className='fs-5'>Instragram: lol23l2dsa</h4>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
        </div>
    </div>
  )
}

export default PostPage