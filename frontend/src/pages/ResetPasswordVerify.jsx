import React, { useState } from 'react'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/auth'

const ResetPasswordVerify = () => {
  const [resetPassword,setResetPassword] = useState({email:"",otp:"",newPassword:""})
  const navigate = useNavigate()
  const {postResetVerifyOTP} = useAuthStore()
  const handleResetPassword= async(resetPassword)=>{
    const {success,message} = await postResetVerifyOTP(resetPassword)
    if(!success){
      toast.error(message,{position:'top-right'})
    }else{
      toast.success(message,{position:'top-right'})
      setResetPassword({email:"",otp:"",newPassword:""})
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
        Change Password
      </Typography>
      <TextField 
        label="Email"
        type='email'
        fullWidth
        sx={{my:2}}
        value={resetPassword?.email}
        onChange={(e)=>setResetPassword({...resetPassword,email: e.target.value})}
      />
      <TextField 
        label="OTP Number"
        type='number'
        fullWidth
        sx={{my:2}}
        value={resetPassword?.otp}
        onChange={(e)=>setResetPassword({...resetPassword,otp: e.target.value})}
      />
      <TextField 
        label="New Password"
        type='password'
        fullWidth
        sx={{my:2}}
        value={resetPassword?.newPassword}
        onChange={(e)=>setResetPassword({...resetPassword,newPassword: e.target.value})}
      />
      <Button onClick={()=>handleResetPassword(resetPassword)} variant='contained' fullWidth sx={{my:2}}>
        Verify OTP
      </Button>
    </Paper>
    </Container>
  )
}

export default ResetPasswordVerify