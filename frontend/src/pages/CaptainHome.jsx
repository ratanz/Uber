import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopup from '../components/ConfirmRidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export const CaptainHome = () => {


  const [ridePopupPanel, setRidePopupPanel] = useState(true)
  const [confirmRidePopupPanel, setConfrimRidePopupPanel] = useState(false)


  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [ridePopupPanel])
  
  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [confirmRidePopupPanel])


  return (
    <div className='h-screen '>

      <div className='nav-bar fixed p-6 top-0 flex items-center justify-between w-full'>
        <img className='w-16 ' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="" />
        <Link to='/home' className='w-10 h-10 bg-white flex items-center justify-center rounded-full '>
          <i className="text-lg font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" alt="" />
      </div>

      <div className='h-2/5 p-10 mt-4'>
        <CaptainDetails />
      </div>

      <div
        ref={ridePopupPanelRef}
        className='fixed z-10 w-full bottom-0 translate-y-full px-3 py-10 pt-12 bg-white'>
        <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfrimRidePopupPanel}  />
      </div>
      
      <div
        ref={confirmRidePopupPanelRef}
        className='fixed z-10 w-full h-screen bottom-0 translate-y-full px-3 py-10 pt-12 bg-white'>
        <ConfirmRidePopup setConfirmRidePopupPanel={setConfrimRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>


    </div>
  )
}
