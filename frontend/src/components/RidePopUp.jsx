import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setRidePopupPanel(false)
            }} className='p-1 text-center absolute top-0 w-[93%]'> <i className="ri-arrow-down-wide-line text-3xl text-gray-400 "></i></h5>

            <h2 className='text-2xl font-bold mb-5'>New Ride Avaliable!</h2>

            <div className='flex items-center justify-between p-3 bg-yellow-400/70 rounded-lg mt-6'>
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

                <div className='button-container flex md:flex-row justify-center w-full gap-2 p-4  items-start rounded-xl'>
                    <button onClick={() => {
                        props.setConfirmRidePopupPanel(true)
                    }}
                        className='bg-green-500 font-semibold  w-full text-white px-10 py-2 rounded-lg'>Accept</button>

                    <button onClick={() => {
                        props.setRidePopupPanel(false)
                    }}
                        className='bg-gray-200 font-semibold  w-full text-gray-700 px-10 py-2 rounded-lg'>Ignore</button>
                </div>

            </div>


        </div>
    )
}

export default RidePopUp
