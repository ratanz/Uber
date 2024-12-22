import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const UserLogin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userData, setUserData] = useState({})

    const { user, setUser } = useContext(UserDataContext)
    const navigate = useNavigate()


    const submitHandler = async (e) => {
        e.preventDefault()
  
        const useData = {
            email: email,   
            password: password
        }
        setEmail("")
        setPassword("") 
        
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

        if( response.status === 200) {
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/home')
        }
    }


    return (
        <div className="p-7 h-screen flex flex-col justify-between  ">
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="Uber logo" className='w-16 mb-14 ' />
          
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

                    <p className="text-center p-2"> New here ?   <Link to='/signup' className="text-blue-600 ">
                        Create New Account
                    </Link></p>

                </form>
            </div>
            <div>
                <Link to='/captain-login' className="flex items-center justify-center mb-5 bg-yellow-500 text-black font-semibold rounded px-4 py-2 mt-3 w-full">Sign in as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin
