import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const CaptainRiding = (props) => {

  const [finishRidePanel, setFinishRidePanel] = useState(false)

  const finishRidePanelRef = useRef(null)

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [finishRidePanel])


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

      <div 
      onClick={() => {
        setFinishRidePanel(true)
      }}
      className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400'>

        <h5 onClick={() => {
          setFinishRidePanel(true)
        }} className='p-1 text-center absolute top-2 right-4 w-[93%]'> <i className="ri-arrow-up-wide-line text-3xl text-gray-900 "></i></h5>

        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button className='bg-green-500 font-semibold text-white px-6 py-3 rounded-lg'>Complete Ride</button>
      </div>

      <div
        ref={finishRidePanelRef}
        className='fixed z-10 w-full bottom-0 translate-y-full px-3 py-10 pt-12 bg-white'>
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>

    </div>
  )
}

export default CaptainRiding
