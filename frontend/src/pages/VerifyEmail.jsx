import React, { useState } from 'react'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/auth'

const VerifyEmail = () => {
  const [otp,setOtp] = useState("")
  const {postVerifyOTP} = useAuthStore()
  const navigate = useNavigate()
  const handleVerifyOTP=async(otp)=>{
    const {success,message} = await postVerifyOTP(otp)
    if(!success){
      toast.error(message,{position:'top-right'})
    }else{
      toast.success(message,{position: 'top-right'})
      setOtp('')
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }
  }
  return (
    <Container maxWidth='sm'>
      <ToastContainer />
    <Paper elevation={5} sx={{p:3,my:5}}>
      <Typography variant='h6' color='primary' align='center' sx={{my:2}}>
        Verify OTP
      </Typography>
      <TextField 
        label="OTP Number"
        type='number'
        fullWidth
        sx={{my:2}}
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
      />
      <Button onClick={()=>handleVerifyOTP(otp)} variant='contained' fullWidth sx={{my:2}}>
        Email Verification
      </Button>
    </Paper>
    </Container>
  )
}


export default VerifyEmail