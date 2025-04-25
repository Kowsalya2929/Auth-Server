import React, { useState } from 'react'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import useAuthStore from '../store/auth'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [email,setEmail] = useState('')
  const {postSendResetVerifyOtp} = useAuthStore()
  const navigate = useNavigate()
  const handleSendResetOtp = async(email)=>{
    const {success,message} = await postSendResetVerifyOtp(email)
    if(!success){
      toast.error(message,{position:'top-right'})
    }else{
      toast.success(message,{position:'top-right'})
      setEmail("")
      setTimeout(() => {
        navigate('/resetPasswordVerify')
      }, 3000);
    }
  }
  return (
    <Container maxWidth='sm'>
      <ToastContainer />
    <Paper elevation={5} sx={{p:3,my:5}}>
      <Typography variant='h6' color='primary' align='center' sx={{my:2}}>
        Forget Password
      </Typography>
      <TextField 
        label="Email"
        type='email'
        fullWidth
        sx={{my:2}}
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <Button onClick={()=>handleSendResetOtp(email)} variant='contained' fullWidth sx={{my:2}}>
        Send OTP
      </Button>
    </Paper>
    </Container>
  )
}

export default ResetPassword