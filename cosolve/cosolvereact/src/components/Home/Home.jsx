import React from 'react'
import './home.css'
import MyCard from '../Card/MyCard'

function Home() {
  return (
    <div className='homepage text-light'>
        <div className='px-4 cont d-flex flex-row justify-content-center pt-5'>
            <div className = "desc d-flex flex-column align-content-center">
                <h1 className='mb-0 title'>CoSolve</h1>
                <p className='caption'>Bringing the world with collaborative solution</p>
                <div className='d-flex align-content-center'>
                    <p className='des'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui facere, earum tempore blanditiis aperiam, quas deleniti assumenda esse vel quae aspernatur, nisi itaque eius doloribus.
                       </p>
                </div>
            </div>
            <div className='image'>
                <img className='img-fluid img-thumbnail' src="https://picsum.photos/700/500" alt="" />
            </div>
        </div>

        <div className='posts'>
            <h1 className='anim'>Popular Today: </h1>
            <div className='anim d-flex flex-row flex-wrap filter my-3'>
                <h1 className=''>Filters</h1>
                <select name="Location" className='loc border-light text-light rounded-4 ps-3' id="">
                    <option value="Location">Region</option>
                    <option value="1">Ibrahimpatnam</option>
                    <option value="2">Hyderabad</option>
                    <option value="3">L B Nagar</option>
                    <option value="4">Nagole</option>
                    <option value="5">Secunderabad</option>
                </select>

                <select name="Location" className='loc border-light text-light rounded-4 ps-3' id="">
                    <option value="Location">Service</option>
                    <option value="1">Vehicle</option>
                    <option value="2">Volunteers</option>
                    <option value="3">Other</option>
                </select>

                <select name="Location" className='loc border-light text-light rounded-4 ps-3' id="">
                    <option value="Location">Status</option>
                    <option value="1">Open</option>
                    <option value="2">Closed</option>
                </select>
            </div>
            <div className='d-flex flex-row post-card'>
                <MyCard title= "Vehicle"/>
                <MyCard title= "Other"/>
                <MyCard title= "Volunteer"/>
                <MyCard title= "Man Power"/>
                <MyCard title= "Vehicle"/>
            </div>
        </div>
    </div>
  )
}

export default Home