import React, { useState } from 'react'
import { Link } from "react-router-dom"

const CaptainSignup = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    setUserData({
     fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password
    })

    console.log(userData)
    setEmail("")
    setPassword("")
    setFirstName("")
    setLastName("")

  }


  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between  ">
      <div>
      <img src="https://www.svgrepo.com/show/505031/uber-driver.svg " alt="Uber logo" className='w-16 mb-2 ' />

        <form action="" onSubmit={(e) => submitHandler(e)}>

          <h3 className="text-lg font-medium mb-2"> What&apos;s our captain's name?</h3>
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

          <h3 className="text-lg w-full font-medium mb-2"> What&apos;s our captain's email?</h3>
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

          <button type="submit" className="bg-black text-white font-semibold rounded px-4 py-2 mt-5 w-full">Log In</button>

          <p className="text-center p-2"> Already have an account ?   <Link to='/captain-login' className="text-blue-600 ">
            Log in here
          </Link></p>

        </form>
      </div>

      <div>
        <p className='p-2 text-[13px] leading-tight md:flex md:items-center md:justify-center gap-1'>
          This site is protected by reCAPTCHA and the <span className="underline"> Google privacy </span> and Terms of Service apply.
        </p>
      </div>

    </div>
  )
}

export default CaptainSignup
