import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Register from './pages/Register.jsx'
import ResetPasswordVerify from './pages/ResetPasswordVerify.jsx'
import SendEmailVerify from './pages/SendEmailVerify.jsx'
import Logout from './pages/Logout.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/resetPassword' element={<ResetPassword />} />
      <Route path='/resetPasswordVerify' element={<ResetPasswordVerify />} />
      <Route path='/register' element={<Register />} />
      <Route path='/sendEmailVerify' element={<SendEmailVerify />} />
      <Route path='/emailVerify' element={<VerifyEmail />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App