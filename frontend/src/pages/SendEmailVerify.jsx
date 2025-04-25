import React from 'react'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import useAuthStore from '../store/auth'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const SendEmailVerify = () => {
  const {postSendVerifyOtp} = useAuthStore()
  const navigate = useNavigate()
  const handleSendOTP = async()=>{
    const {success,message} = await postSendVerifyOtp()
    if(!success){
      toast.error(message,{position:'top-right'})
    }else{
      toast.success(message,{position: 'top-right'})
      setTimeout(() => {
        navigate('/emailVerify')
      }, 3000);
    }
  }
  return (
    <Container maxWidth='sm'>
      <ToastContainer />
    <Paper elevation={5} sx={{p:3,my:5}}>
      <Typography variant='h6' color='primary' align='center' sx={{my:2}}>
        Email Verification
      </Typography>
      <TextField 
        label="Email"
        type='email'
        fullWidth
        sx={{my:2}}
      />
      <Button onClick={handleSendOTP} variant='contained' fullWidth sx={{my:2}}>
        Send OTP
      </Button>
    </Paper>
    </Container>
  )
}

export default SendEmailVerify