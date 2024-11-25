import React, { useState, useEffect } from 'react';
import './home.css';
import { useSelector } from 'react-redux';
import MyCard from '../Card/MyCard';
import useGetAllPost from '../../hooks/useGetAllPost';

function Home() {
    useGetAllPost();
    const { posts } = useSelector(store => store.post);
    console.log(posts);

    // Filter states
    const [region, setRegion] = useState('');
    const [service, setService] = useState('');
    const [status, setStatus] = useState('');

    // Posts to render
    const [postsToRender, setPostsToRender] = useState(posts.slice(0, 6));

    // Handle filtering logic
    useEffect(() => {
        let filteredPosts = [...posts];

        if (region) {
            filteredPosts = filteredPosts.filter(post => post.location === region);
        }

        if (service) {
            filteredPosts = filteredPosts.filter(post => post.category === service);
        }

        if (status) {
            filteredPosts = filteredPosts.filter(post => post.status === status);
        }

        // Show first 6 posts if no filters are applied
        if (!region && !service && !status) {
            setPostsToRender(posts.slice(0, 6));
        } else {
            setPostsToRender(filteredPosts);
        }
    }, [region, service, status, posts]);

    return (
        <div className='homepage text-light'>
            <div className='px-4 cont d-flex flex-row justify-content-center pt-5'>
                <div className="desc d-flex flex-column align-content-center">
                    <h1 className='mb-0 title'>CoSolve</h1>
                    <p className='caption'>Bringing the world with collaborative solution</p>
                    <div className='d-flex align-content-center'>
                        <p className='des'>
                            At CoSolve, we believe in harnessing the power of connection to solve real-life problems. Our platform is designed to bridge gaps, bringing people together to share resources, skills, and opportunities.
                        </p>
                    </div>
                </div>
                <div className='image'>
                    <img className='img-fluid img-thumbnail' src="/images/home.jpg" alt="" />
                </div>
            </div>

            <div className='posts'>
                <h1 className='anim'>Popular Today: </h1>
                <div className='anim d-flex flex-row flex-wrap filter my-3'>
                    <h1 className=''>Filters</h1>

                    <select
                        name="Location"
                        className='loc border-light text-light rounded-4 ps-3'
                        onChange={(e) => setRegion(e.target.value)}
                        value={region}
                    >
                        <option value=''>Region</option>
                        <option value='Ibrahimpatnam'>Ibrahimpatnam</option>
                        <option value='Hyderabad'>Hyderabad</option>
                        <option value='Secunderabad'>Secunderabad</option>
                        <option value='L B Nagar'>L B Nagar</option>
                    </select>

                    <select
                        name="Service"
                        className='loc border-light text-light rounded-4 ps-3'
                        onChange={(e) => setService(e.target.value)}
                        value={service}
                    >
                        <option value=''>Service</option>
                        <option value='Transport'>Transport</option>
                        <option value='Rental'>Rental</option>
                        <option value='Skills'>Skills</option>
                    </select>

                    <select
                        name="Status"
                        className='loc border-light text-light rounded-4 ps-3'
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                    >
                        <option value="">Status</option>
                        <option value="Active">Active</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                <div className='d-flex flex-row post-card'>
                    {postsToRender.length>0?(
                        postsToRender.map((post) => (
                            <MyCard key={post._id} post={post} />
                        ))
                    ) : (
                        <div className='no-post w-100 d-flex flex-row justify-content-center align-items-center fs-3'>
                            No posts with specified filters
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;
