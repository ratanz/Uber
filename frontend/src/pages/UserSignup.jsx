import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
        };

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/users/register`, 
            newUser,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 201) {
            const data = response.data;
            setUser(data.user);
            localStorage.setItem('token', data.token);
            navigate('/home');
        }
    } catch (error) {
        setError(error.response?.data?.message || "Registration failed");
        console.error("Registration error:", error.response?.data || error.message);
    }
  }


  return (
    <div className="p-7 h-screen flex flex-col justify-between  ">
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="Uber logo" className='w-16 mb-14 ' />

        <form action="" onSubmit={(e) => submitHandler(e)}>

          <h3 className="text-lg font-medium mb-2"> What&apos;s your name?</h3>
          <div className='flex gap-4 mb-5 '>
            <input type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee]  rounded px-2 py-2 border w-1/2 text-lg placeholder:text-base input-focus"
              placeholder="First name" />

            <input type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='bg-[#eeeeee]  rounded px-2 py-2 border w-1/2 text-lg placeholder:text-base input-focus'
              placeholder="Last name"
            />
          </div>

          <h3 className="text-lg font-medium mb-2"> What&apos;s your email?</h3>
          <input type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base input-focus"
            placeholder="Enter your email" />

          <h3 className="text-lg font-medium mb-2"> Enter Password</h3>

          <input type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base input-focus"
            placeholder="Enter your password" />

          <button type="submit" className="bg-black text-white font-semibold rounded px-4 py-2 mt-5 w-full">Create account</button>

          <p className="text-center p-2"> Already have an account ? <Link to='/login' className="text-blue-600 ">
            Log in here
          </Link></p>

        </form>
      </div>

      <div>
        <p className='p-2 text-[13px] leading-tight md:flex md:items-center md:justify-center gap-1'>
          By proceeding, you agree to our <Link to='/terms' className="text-black font-bold underline"> Terms of Service</Link> and <Link to='/privacy' className="text-black font-bold underline">Privacy Policy</Link>
        </p>
      </div>

    </div>
  )
}

export default UserSignup
