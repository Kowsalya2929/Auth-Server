import React from 'react'
import { Button, Container, Paper, Typography } from '@mui/material'
import useAuthStore from '../store/auth.js'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/user.js'

const Logout = () => {
  const {logoutData} = useUserStore()
  const {postLogout} = useAuthStore()
  const navigate = useNavigate()
  const handleLogout = async()=>{
    const {success,message} = await postLogout()
    if(!success){
      toast.error(message,{position: 'top-right'})
    }else{
      toast.success(message,{position: 'top-right'})
      logoutData()
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }
  }
  return (
    <Container maxWidth='sm'>
      <ToastContainer />
    <Paper elevation={5} sx={{p:3,my:5}}>
      <Typography variant='h6' color='error' align='center' sx={{my:2}}>
        Are you sure. Do you wanna logout?
      </Typography>
      <Button onClick={handleLogout} variant='contained' fullWidth sx={{my:2}}>
        Logout
      </Button>
    </Paper>
    </Container>
  )
}

export default Logout