import React, { useState, useRef, useContext, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'


const Home = () => {

  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null) // 'pickup' or 'destination'
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  const navigate = useNavigate()

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  // socket connection
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    socket.emit('join', { userType: 'user', userId: user._id })
  }, [user])

  socket.on('ride-confirmed', ride => {
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    console.log(ride)
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride } })
  })


  const fetchSuggestions = async (query, type) => {
    try {
      if (!query) return;

      const token = localStorage.getItem('token'); // Get auth token

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: {
          input: query
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data && response.data.suggestions) {
        setSuggestions(response.data.suggestions);
        setActiveField(type);
        setPanelOpen(true);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      // Handle unauthorized error
      if (error.response && error.response.status === 401) {
        // Redirect to login or handle unauthorized access
        console.error('Unauthorized access. Please login.');
      }
    }
  }

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    setActiveField('pickup'); // Ensure we're in pickup mode when typing

    if (value.length > 2) {
      await fetchSuggestions(value, 'pickup');
    } else {
      setSuggestions([]);
    }
  }

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    setActiveField('destination'); // Ensure we're in destination mode when typing

    if (value.length > 2) {
      await fetchSuggestions(value, 'destination');
    } else {
      setSuggestions([]);
    }
  }

  const handleSuggestionSelect = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion);
      setActiveField('destination'); // Automatically switch to destination field
      setSuggestions([]); // Clear suggestions but keep panel open
      // Focus the destination input after selecting pickup
      const destinationInput = document.querySelector('input[placeholder="Enter your destination..."]');
      if (destinationInput) {
        destinationInput.focus();
      }
    } else {
      setDestination(suggestion);
      setSuggestions([]);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
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
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [vehiclePanel])

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [confirmRidePanel])

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [vehicleFound])

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [waitingForDriver])

  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setFare(response.data)
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })


  }


  return (
    <div className='h-screen relative overflow-hidden'>

      <img className='w-16 absolute top-10 left-10 z-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="" />

      <div className='h-screen w-screen absolute top-0 left-0'>
        <LiveTracking />
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full pointer-events-auto'>
        <div className='lg:h-[35%] h-[30%] p-5 bg-white relative pointer-events-auto z-10'>
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(!panelOpen)}
            className='absolute top-4 right-6 text-3xl '>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className='text-2xl font-bold '>Find a trip</h4>

          <form onSubmit={submitHandler}
            className=''>
            <div className="line absolute h-16 w-1 top-[40%] left-10 bg-gray-900 rounded-full"></div>
            <input
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => {
                setActiveField('pickup')
                setPanelOpen(true)
              }}
              className='bg-[#eee] px-12 py-3 text-lg rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a pickup location' />

            <input
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setActiveField('destination')
                setPanelOpen(true)
              }}
              className='bg-[#eee] px-12 py-3 text-lg rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter your destination' />
          </form>
          <button
            onClick={findTrip}
            className='text-sm font-bold mt-6 bg-black text-white py-3 px-6 rounded-lg w-full hover:bg-gray-800 transition-colors'>Find Trip</button>
        </div>

        <div
          ref={panelRef}
          className='h-0 bg-white  '>
          <LocationSearchPanel
            suggestions={suggestions}
            onSuggestionSelect={handleSuggestionSelect}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed z-10 w-full bottom-0 translate-y-full px-3 py-10 pt-12 bg-white'>
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed z-10 w-full bottom-0 translate-y-full px-3 py-6 pt-12 bg-white'>
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div ref={vehicleFoundRef}
        className='fixed z-10 w-full bottom-0 translate-y-full px-3 py-6 pt-12 bg-white'>
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef}
        className='fixed z-10 w-full bottom-0 translate-y-full px-3 py-6 pt-12 bg-white'>
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver} />
      </div>

    </div>
  )
}

export default Home