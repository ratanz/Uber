import React, { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'

const Home = () => {

  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [panelOpen, setPanelOpen] = useState(false)
  
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 20,
        duration: 0.5,
        ease: 'power2.out',
      })
      gsap.to(panelCloseRef.current, {
        opacity:1,
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
      })
      gsap.to(panelCloseRef.current, {
        opacity:0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [panelOpen, panelCloseRef])


  return (
    <div className='h-screen relative'>

      <img className='w-16 absolute top-10 left-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="" />

      <div className='h-screen w-screen'>
        {/* temp image */}
        <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" alt="" />
      </div>

      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>

        <div className='h-[30%] p-5 bg-white relative'>
          <h5 
          ref={panelCloseRef}
          onClick={() => setPanelOpen(!panelOpen)}
          className='absolute top-4 right-6 text-3xl '>
          <i className="ri-arrow-down-wide-line"></i>
          </h5>
          
          <h4 className='text-2xl font-bold '>Find a trip</h4>
        
          <form onSubmit={(e) => {
            submitHandler(e)
          }}
            className=''>
            <div className="line absolute h-16 w-1 top-[35%] left-10 bg-gray-900 rounded-full"></div>
            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setPanelOpen(true)}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a pickup location' />

            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setPanelOpen(true)}
              className='bg-[#eee] px-12 py-3 text-lg rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter your destination' />
          </form>
        </div>

        <div
          ref={panelRef}
          className='h-0 bg-white  '>
              <LocationSearchPanel />
        </div>
      </div>

    </div>
  )
}

export default Home