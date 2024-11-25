import React from 'react';
import './ongoing.css';
import OngoingCardid from '../OngoingCard/OngoingCardid'
import OngoingCardObj from '../OngoingCard/OngoingCardObj'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function MyCard(props) {
  const { user } = useSelector(store => store.auth);
  return (
    <div className="p-4 text-light d-flex flex-column">
      {/* Page Header */}
      <div className='w-100 d-flex justify-content-center mt-4'>
        <h1>Ongoing</h1>
      </div>
      <div className='w-100 d-flex justify-content-center text-light'>
        <hr className='w-50 bg-light text-light' /></div>

      {/* Card Component */}
      <div className='d-flex flex-row post-card mt-5'>
        {
          user.ongoing.length > 0 ? (
            user.ongoing.map((post, index) => {
              if (typeof post === 'object' && post !== null) {
                return <OngoingCardObj key={index} post={post} />;
              } else {
                return <OngoingCardid key={index} post={post} />;
              }
            })

          ) : (
            <div className='d-flex justify-content-center'>
              No ongoing posts
            </div>
          )
        }

      </div>
      <Outlet />
    </div>
  );
}

export default MyCard;
