
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='  bg-[url(https://miro.medium.com/v2/resize:fit:828/format:webp/0*SL7ScBQXovvaJT--)] bg-cover  bg-center h-screen w-ful flex justify-between flex-col pt-8 '>
        <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="Uber logo" className='w-14 ml-8 ' />
        <div className='bg-white pb-7 py-5 px-5 '> 
            <h2 className='text-[30px] font-bold'>Get started with Uber</h2>
            <Link  to='/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-4'>Contiune</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
