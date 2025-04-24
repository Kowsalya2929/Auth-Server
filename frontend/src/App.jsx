import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Register from './pages/Register.jsx'
import ResetPasswordVerify from './pages/ResetPasswordVerify.jsx'

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
    </Routes>
    </BrowserRouter>
  )
}

export default App