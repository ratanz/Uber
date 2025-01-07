import React, {useState}from 'react'
import { Link } from 'react-router-dom'
import FinishRide from './FinishRide'

const ConfirmRidePopup = (props) => {

    const [otp, setOtp] = useState("")

    const sumbitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <h5 onClick={() => {
                props.setConfirmRidePopupPanel(false)
            }} className='p-1 text-center absolute top-0 w-[93%]'> <i className="ri-arrow-down-wide-line text-3xl text-gray-400 "></i></h5>

            <h2 className='text-2xl font-bold mb-5'>Confirm this ride to start!</h2>

            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-6'>
                <div className='flex items-center gap-2'>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBvcnRyYWl0JTIwbWVufGVufDB8fDB8fHww" alt="" />
                    <h2 className='text-lg font-medium'>Ratan Rathod</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.7 KM</h5>
            </div>

            <div className='flex flex-col justify-between items-center gap-3'>

                <div className='w-full mt-5 '>

                    <div className='flex items-center p-3 border-b-2 gap-4 my-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>24B,Purva's cafe</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Pimpri Chinchwad, Pune Maharashtra</p>
                        </div>
                    </div>


                    <div className='flex items-center p-3 border-b-2  gap-4 my-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>24B,Purvaaaa's cafe</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Pimpri Chinchwad, Pune Maharashtra</p>
                        </div>
                    </div>

                    <div className='flex items-center p-3  gap-4 my-2'>
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹197.24</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>

                </div>

                <div className='button-container w-full '>
                    <form className='flex flex-col items-center justify-center gap-2 p-4 rounded-xl' onSubmit={(e) => {
                        sumbitHandler(e)
                    }}>
                        <input
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value)
                            }} type="text" placeholder='Enter OTP' className='bg-[#eee] px-6 py-4 text-lg rounded-lg font-mono md:w-1/2 w-full ' />

                        <Link to='/captain-riding' onClick={() => {
                            props.setConfirmRidePopupPanel(true)
                            props.setRidePopupPanel(false)
                        }}
                            className='bg-green-500 text-center text-lg md:w-1/2 w-full font-semibold text-white px-10 py-2 rounded-lg'>Confirm</Link>

                        <button onClick={() => {
                            props.setRidePopupPanel(false)
                            props.setConfirmRidePopupPanel(false)
                        }}
                            className='bg-red-500 text-lg font-semibold md:w-1/2  w-full text-white px-10 py-2 rounded-lg'>Cancel</button>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default ConfirmRidePopup



