import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = (props) => {

  // sample array of locations
  const locations = [
    "24B,Purva's cafe, Pune, Pimpri Chinchwad",
    "123 Main Street, Downtown Area, Mumbai, Maharashtra",
    "456 Park Avenue, Koregaon Park, Pune, Maharashtra",
    "789 MG Road, Near City Mall, Bangalore, Karnataka",
    "321 Anna Salai, T Nagar, Chennai, Tamil Nadu",
    "432 Civil Lines, Near Metro Station, Delhi, NCR",
    "765 SG Highway, Satellite Area, Ahmedabad, Gujarat"
  ]

  return (
    <div>
      {
        locations.map((location, index) => {
          return (
            <div onClick={() => {
              props.setVehiclePanel(true)
              props.setPanelOpen(false)
            }} className='flex items-center justify-start p-3 border-2 border-gray-50 active:border-black rounded-xl  gap-4 my-2' key={index}>
              <h2><i className=" bg-[#eee] rounded-full h-10 w-10 flex items-center justify-center ri-map-pin-2-fill"></i></h2>
              <h4 className='font-medium'>{location}</h4>
            </div>
          )
        })
      }

    </div>
  )
}

export default LocationSearchPanel
