import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'


const Captainlogin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { captain, setCaptain } = React.useContext(CaptainDataContext)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()

        const captain =
        {
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

        if(response.status === 200) {   
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/captain-home')
        }

        setEmail("")
        setPassword("")

    }


    return (
        <div className="p-7 h-screen flex flex-col justify-between  ">
            <div>
                <img src="https://www.svgrepo.com/show/505031/uber-driver.svg " alt="Uber logo" className='w-20 mb-2 ' />

                <form action="" onSubmit={(e) => submitHandler(e)}>
                    <h3 className="text-lg font-medium mb-2"> What&apos;s your email?</h3>

                    <input type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
                        placeholder="Enter your email" />

                    <h3 className="text-lg font-medium mb-2"> What&apos;s your password?</h3>

                    <input type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
                        placeholder="Enter your password" />

                    <button type="submit" className="bg-black text-white font-semibold rounded px-4 py-2 mt-5 w-full">Log In</button>

                    <p className="text-center p-2"> Join a fleet?   <Link to='/captain-signup' className="text-blue-600 ">
                        Register as a Captain
                    </Link></p>

                </form>
            </div>
            <div>
                <Link to='/login' className="flex items-center justify-center mb-5 bg-green-400 text-black font-semibold rounded px-4 py-2 mt-3 w-full">Sign in as User</Link>
            </div>
        </div>
    )
}

export default Captainlogin
