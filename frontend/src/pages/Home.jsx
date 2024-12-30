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
  const vehiclePanelRef = useRef(null)

  const [vehiclePanel, setVehiclePanel] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24,
        duration: 0.5,
        ease: 'power2.out',
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [panelOpen, panelCloseRef])

  useGSAP(() => {
    if(vehiclePanel) {
    gsap.to(vehiclePanelRef.current, {
      transform: 'translateY(0)',
      duration: 0.5,
      ease: 'power2.out',
      scrub: 1,
    }) 
  } else {
    gsap.to(vehiclePanelRef.current, {
      transform: 'translateY(100%)',
      duration: 0.5,
      ease: 'power2.out',
    })
  }
  },[vehiclePanel])


  return (
    <div className='h-screen relative overflow-hidden'>

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
          <LocationSearchPanel  vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed z-10 w-full bottom-0 translate-y-full px-3 py-8 bg-white'>
        <h2 className='text-2xl font-bold mb-5'>Choose a Vehicle</h2>

        <div className='flex border-4 mb-4 active:border-black rounded-xl w-full p-3 items-center justify-between '>

          <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />

          <div className=' ml-2 w-1/2'>
            <h4 className='font-medium text-lg'>UberGo <span><i className="ri-user-3-fill"></i>7</span></h4>
            <h5 className='font-semibold text-md'>7 mins away</h5>
            <p className='text-xs'>Affordable, compact ride</p>
          </div>
          <h2 className='text-xl font-bold'>₹197.24</h2>
        </div>

        <div className='flex border-4 mb-4  active:border-black rounded-xl w-full p-3 items-center justify-between '>

          <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png" alt="" />

          <div className='-ml-2 w-1/2'>
            <h4 className='font-medium text-lg'>Moto <span><i className="ri-user-3-fill"></i>2</span></h4>
            <h5 className='font-semibold text-md '>3 mins away</h5>
            <p className='text-xs'>Affordable, motorcycle ride</p>
          </div>
          <h2 className='text-xl font-bold'>₹92.2</h2>
        </div>

        <div className='flex border-4 mb-4  active:border-black rounded-xl w-full p-3 items-center justify-between '>

          <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />

          <div className='w-1/2'>
            <h4 className='font-medium text-lg'>Uber Auto<span><i className="ri-user-3-fill"></i>2</span></h4>
            <h5 className='font-semibold text-md '>4 mins away</h5>
            <p className=' text-xs'>Affordable, Auto ride</p>
          </div>
          <h2 className='text-xl font-bold'>₹127.94</h2>
        </div>

      </div>

    </div>
  )
}

export default Home