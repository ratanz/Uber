import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setVehiclePanel(false)
            }} className='p-1 text-center absolute top-0 w-[93%]'> <i className="ri-arrow-down-wide-line text-3xl text-gray-400 "></i></h5>
            <h2 className='text-2xl font-bold mb-5'>Choose a Vehicle</h2>

            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('car')
            }} className='flex border-4 mb-4 active:border-black rounded-xl w-full p-3 items-center justify-between '>

                <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />

                <div className=' ml-2 w-1/2'>
                    <h4 className='font-medium text-lg'>UberGo <span><i className="ri-user-3-fill"></i>7</span></h4>
                    <h5 className='font-semibold text-md'>7 mins away</h5>
                    <p className='text-xs'>Affordable, compact ride</p>
                </div>
                <h2 className='text-xl font-bold'>₹{props.fare.car?.toLocaleString()}</h2>
            </div>

            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('moto')
            }} className='flex border-4 mb-4  active:border-black rounded-xl w-full p-3 items-center justify-between '>

                <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png" alt="" />

                <div className='-ml-2 w-1/2'>
                    <h4 className='font-medium text-lg'>Moto <span><i className="ri-user-3-fill"></i>2</span></h4>
                    <h5 className='font-semibold text-md '>3 mins away</h5>
                    <p className='text-xs'>Affordable, motorcycle ride</p>
                </div>
                <h2 className='text-xl font-bold'>₹{props.fare.moto?.toLocaleString()}</h2>
            </div>

            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('auto')
            }} className='flex border-4 mb-4  active:border-black rounded-xl w-full p-3 items-center justify-between '>

                <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />

                <div className='w-1/2'>
                    <h4 className='font-medium text-lg'>Uber Auto<span><i className="ri-user-3-fill"></i>2</span></h4>
                    <h5 className='font-semibold text-md '>4 mins away</h5>
                    <p className='text-xs'>Affordable, Auto ride</p>
                </div>
                <h2 className='text-xl font-bold'>₹{props.fare.auto?.toLocaleString()}</h2>
            </div>

        </div>
    )
}

export default VehiclePanel
