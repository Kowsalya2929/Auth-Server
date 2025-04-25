import React from 'react'
import { Button, Container, Paper, Typography } from '@mui/material'
import useAuthStore from '../store/auth'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const {postLogout} = useAuthStore()
  const navigate = useNavigate()
  const handleLogout = async()=>{
    const {success,message} = await postLogout()
    if(!success){
      toast.error(message,{position: 'top-right'})
    }else{
      toast.success(message,{position: 'top-right'})
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