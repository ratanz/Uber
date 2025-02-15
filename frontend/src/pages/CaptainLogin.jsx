import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'


const Captainlogin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { captain, setCaptain } = React.useContext(CaptainDataContext)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        setError("") // Clear previous errors
        
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/captains/login`, 
                {
                    email: email,
                    password: password
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if(response.status === 200) {   
                const data = response.data
                setCaptain(data.captain)
                localStorage.setItem('token', data.token)
                navigate('/captain-home')
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message)
            setError(error.response?.data?.message || "Login failed. Please try again.")
        }

        setEmail("")
        setPassword("")
    }


    return (
        <div className="p-7 h-screen flex flex-col justify-between  ">
            <div>
                <img src="https://www.svgrepo.com/show/505031/uber-driver.svg " alt="Uber logo" className='w-20 mb-2 ' />

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form action="" onSubmit={(e) => submitHandler(e)}>
                    <h3 className="text-lg font-medium mb-2"> What&apos;s your email?</h3>

                    <input type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
                        placeholder="Enter your email"
                        autoComplete="username" />

                    <h3 className="text-lg font-medium mb-2"> What&apos;s your password?</h3>

                    <input type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
                        placeholder="Enter your password"
                        autoComplete="current-password" />

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

