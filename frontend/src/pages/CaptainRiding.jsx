import React from 'react'
import { Link } from 'react-router-dom'

const CaptainRiding = () => {
  return (
    <div className='h-screen relative '>


      <div className='nav-bar fixed p-6 top-0 flex items-center justify-between w-full'>
        <img className='w-16 ' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="" />
        <Link to='/home' className='w-10 h-10 bg-white flex items-center justify-center rounded-full '>
          <i className="text-lg font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-4/5'>
        <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" alt="" />
      </div>

      <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400'>

        <h5 onClick={() => {

        }} className='p-1 text-center absolute top-2 right-4 w-[93%]'> <i className="ri-arrow-up-wide-line text-3xl text-gray-900 "></i></h5>

        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button className='bg-green-500 font-semibold text-white px-6 py-3 rounded-lg'>Complete Ride</button>
      </div>

    </div>
  )
}

export default CaptainRiding
