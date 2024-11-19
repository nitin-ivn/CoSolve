import React from 'react'
import './about.css'

function About() {
  return (
    <div className='aboutpage text-light'>
      <div className='w-100 d-flex justify-content-center mt-2'>
        <h1>About Us</h1>
      </div>
      <div className='con px-4 slideleft d-flex flex-row justify-content-center'>
        <div className='abt-details pe-5'>
        <h1 className='mb-0 abt-title'>CoSolve</h1>
        <p className=''>Bringing the world with collaborative solution</p>

        <p className="text-white">
        At CoSolve, we believe in harnessing the power of connection to solve real-life problems. Our platform is designed to bridge gaps, bringing people together to share resources, skills, and opportunities. Whether you're looking to carpool, rent a vehicle, collaborate on a project, or simply help someone in need, CoSolve offers a seamless and intuitive way to connect with like-minded individuals.
        </p>
        <p className="text-white">
        We aim to create a community-driven ecosystem where everyone can benefit from shared resources and mutual collaboration. By leveraging technology, we aspire to build meaningful networks that empower individuals to solve daily challenges efficiently.
        </p>
        <p className="text-white">
        We believe in the strength of shared purpose and the incredible outcomes that arise when individuals unite to overcome challenges. Our platform is not just a tool for connection; it's a catalyst for empowerment, where people with diverse talents and needs come together to create meaningful solutions. By fostering collaboration and enabling mutual growth, we aim to transform everyday problems into opportunities for innovation and lasting impact.
        </p>
        <p className="text-white">
        Join us in creating a future where collaboration meets innovation!
        </p>
        </div>

        <div className='cards slideright d-flex flex-column gap-3 p-2'>
          <div className="glass">
            <div className="card border-light glass text-light text-center h-100">
              <div className="card-body">
                <div className="mx-auto mb-3" style={{ width: '50px', height: '50px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-color-swatch text-primary" width="50" height="50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2" />
                    <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9" />
                    <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12" />
                    <line x1="17" y1="17" x2="17" y2="17.01" />
                  </svg>
                </div>
                <h5 className="card-title">Easy Customization</h5>
                <p className="card-text">
                  Personalize your campaign page's look and feel, from color schemes to fonts, to match your unique style.
                </p>
              </div>
            </div>
          </div>

          <div className="glass">
            <div className="card border-light glass text-light text-center h-100">
              <div className="card-body">
                <div className="mx-auto mb-3" style={{ width: '50px', height: '50px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bolt text-primary" width="50" height="50" fill="currentColor" viewBox="0 0 24 24">
                        <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
                </svg>
                </div>
                <h5 className="card-title">High Performance</h5>
                <p className="card-text">
                  Our platform is optimized for fast performance, ensuring your supporters can access your campaign quickly and easily.
                </p>
              </div>
            </div>
          </div>


          <div className="glass">
            <div className="card border-light glass text-light text-center h-100">
              <div className="card-body">
                <div className="mx-auto mb-3" style={{ width: '50px', height: '50px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-tools text-primary" width="50" height="50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 21h4l13 -13a2.828 2.828 0 0 0 -4 -4l-13 13v4" />
                  <line x1="14.5" y1="5.5" x2="18.5" y2="9.5" />
                  <polyline points="12 8 7 3 3 7 8 12" />
                  <line x1="7" y1="8" x2="5.5" y2="9.5" />
                  <polyline points="16 12 21 17 17 21 12 16" />
                  <line x1="17" y1="16" x2="15.5" y2="17.5" />
                </svg>
                </div>
                  <h5 className="card-title">Comprehensive Tools</h5>
                  <p className="card-text">
                    Access a wide range of tools to manage and optimize your campaign, including analytics, social sharing, and more.
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default About;