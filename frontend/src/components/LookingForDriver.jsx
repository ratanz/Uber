import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div >
            <h5 onClick={() => {
                props.setVehicleFound(false)
            }} className='p-1 text-center absolute top-1 w-[93%]'> 
                <i className="ri-arrow-down-wide-line text-3xl text-gray-400 "></i>
            </h5>
            <h3 className='text-2xl font-bold mb-2'>Looking for a Driver</h3>

            <div className='flex gap-2 items-center justify-center'>
                <div className='relative'>
                    <img className='h-28' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />
                    <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
                        <div className='animate-bounce bg-green-500 text-white px-3 py-1 rounded-full text-sm'>
                            Searching...
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-between items-center gap-3 h-[33vh]'>
                <div className='w-full mt-5 '>
                    <div className='flex items-center p-3 border-b-2 gap-4 my-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>

                    <div className='flex items-center p-3 border-b-2  gap-4 my-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>

                    <div className='flex items-center p-3  gap-4 my-2'>
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]?.toLocaleString()}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => props.setVehicleFound(false)} 
                    className='w-full bg-red-500 text-white font-semibold p-3 rounded-lg'>
                    Cancel Search
                </button>
            </div>
        </div>
    )
}

export default LookingForDriver
