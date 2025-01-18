import React, {useContext} from 'react'
import { CaptainDataContext } from '../context/CaptainContext';


const CaptainDetails = () => {

  const { captain} = useContext(CaptainDataContext);

  return (
    <div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-4'> 
            <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
            <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname} {captain.fullname.lastname}</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>
              ₹275.02
            </h4>
            <p className='text-sm text-gray-600'>Earned</p>
          </div>
        </div>

        <div className='flex justify-center gap-5 p-4 mt-8 items-start bg-gray-100 rounded-xl'>
          <div className='text-center'>
            <i className=" text-3xl mb-2 font-thin ri-timer-2-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className=" text-3xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className=" text-3xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails
