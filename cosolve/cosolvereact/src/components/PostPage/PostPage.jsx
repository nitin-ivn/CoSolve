import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';


import './postpage.css'
import { useParams } from 'react-router-dom'

function PostPage() {
  const [ToggleBookmark,setToggleBookmark] = useState(false)
  const [Bookimage, setBookimage] = useState('/icons/bookmark.svg');
  const postId = useParams();

  const handlebookmark = () => {
    if(ToggleBookmark){
      setBookimage('/icons/bookmark1.svg')
      setToggleBookmark((prev) => !prev );
    }else{
      setBookimage('/icons/bookmark.svg')
      setToggleBookmark((prev) => !prev );
    }
  }
    

  return (
    <div>
        <div className='d-flex position-relative text-light p-3 justify-content-center gap-5 postpage'>
          <div className="detail p-4">
            <h1>Service: Volunteer</h1>
            <p className='fs-3 m-0'>Posted By: <a className='user'>User245</a></p>
            <h4 className='m-0'>Location: Near SBI Bank, Ibrahimpatnam</h4>
            <h4>Status: <span className='text-success'>Active</span></h4>
            <h3 className='mt-5'>Description: <p className='fs-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quidem quibusdam voluptas quisquam distinctio expedita repudiandae corrupti facilis, delectus alias! Delectus maxime voluptatibus neque quos!\ ipsum dolor sit amet consectetur adipisicing elit. Eum rerum sed esse praesentium, aliquam velit!</p></h3>
          </div>
          <div className="post-img d-flex">
              <img className='img-fluid img-thumbnail' src="https://picsum.photos/700/500" alt="" />
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown-toggle">
                  <img src="/icons/dots1.svg" alt="" />
                </Dropdown.Toggle>

                <Dropdown.Menu className='custom-body'>
                  <Dropdown.Item className='drop-item text-danger' href="#/action-1">
                     Delete Post
                  </Dropdown.Item>
                  <Dropdown.Item className='drop-item' href="#/action-2">
                    <label className='text-light'>Status:</label><br />
                    <button className='btn btn-success me-1'>Active</button>
                    <button className='btn btn-danger'>Closed</button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

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

            <button onClick={handlebookmark} className='bg-light border-1 ms-2 bookmark'><img className='book-img' src={Bookimage} alt="" /></button>
        </div>
    </div>
  )
}

export default PostPage