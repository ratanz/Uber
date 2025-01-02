import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import Start from './pages/Start'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import { CaptainHome } from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectWrapper'
import Riding from './pages/Riding'

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<Captainlogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        <Route path='/user/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />
        <Route path='/captain-home' element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App
