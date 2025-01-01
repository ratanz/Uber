import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div >
            <h5 onClick={() => {
                props.setVehicleFound(false)
                
            }} className='p-1 text-center absolute  w-[93%]'> <i className="ri-arrow-down-wide-line text-3xl text-gray-400 "></i></h5>

            <div className='flex items-center justify-between'>
            <img className='h-12 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />
            <div className='text-right -mt-1 -mb-1'>
                <h2 className='text-lg font-medium'>Ratan</h2>
                <h4 className='text-xl font-semibold'>MP04 AB 1234</h4>
                <p className='font-sm text-gray-600'>Maruti Suzuki Alto</p>
            </div>
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
                            <h3 className='text-lg font-medium'>24B,Purva's cafe</h3>
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
            </div>


        </div>
    )
}

export default LookingForDriver
