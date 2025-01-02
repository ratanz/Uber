import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='h-screen '>

            <Link to='/home' className='fixed right-2 top-2 w-10 h-10 bg-white flex items-center justify-center rounded-full '>
                <i className="text-lg font-bold ri-home-5-line"></i>
            </Link>

            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" alt="" />
            </div>

            <div className='h-1/2 p-10'>
                <div className='flex items-center justify-between'>
                    <img className='h-20 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />
                    <div className='text-right -mt-1 -mb-1'>
                        <h2 className='text-lg font-medium'>Ratan</h2>
                        <h4 className='text-xl font-semibold'>MP04 AB 1234</h4>
                        <p className='font-sm text-gray-600'>Maruti Suzuki Alto</p>
                    </div>
                </div>

                <div className='flex flex-col justify-between items-center gap-3'>
                    <div className='w-full mt-5 '>

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
                <button className='bg-green-500 mt-5 w-full font-semibold text-white px-4 py-2 rounded-lg'>Make a payment</button>
            </div>
        </div>
    )
}

export default Riding
