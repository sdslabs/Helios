import React from 'react'
import Lottie from 'lottie-react'
import fetchingAnimation from './fetching.json'

const Fetching = () => (
  <div className='fetching'>
    <Lottie
      animationData={fetchingAnimation}
      loop
      autoplay
      style={{
        backgroundColor: '#FFFFFF',
      }}
    />
  </div>
)

export default Fetching
