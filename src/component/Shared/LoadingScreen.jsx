import React from 'react'

const LoadingScreen = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-primary'><img src='./loading/load.gif' alt='Loading...' className=' object-contain '/></div>
  )
}

export default LoadingScreen