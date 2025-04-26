import React, { useState } from 'react'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/auth.js'
import { toast, ToastContainer } from 'react-toastify'

const Login = () => {
  const [oldUser,setOldUser] = useState({email:"",password:""})
  const {postLogin} = useAuthStore()
  const navigate = useNavigate()
  const handleSignIn = async(oldUser)=>{
    const {success,message} = await postLogin(oldUser)
    if(!success){
      toast.error(message,{position: 'top-right'})
    }else{
      toast.success(message,{position:'top-right'})
      setOldUser({email:"",password:""})
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }
  }
  return (
    <Container maxWidth='sm'>
      <ToastContainer />
    <Paper elevation={5} sx={{p:3,my:5}}>
      <Typography variant='h6' color='primary' align='center'>
        Login
      </Typography>
      <TextField 
        label="Email"
        type='email'
        fullWidth
        sx={{my:1}}
        value={oldUser?.email}
        onChange={(e)=>setOldUser({...oldUser,email: e.target.value})}
      />
      <TextField 
        label="Password"
        type='password'
        fullWidth
        sx={{my:1}}
        value={oldUser.password}
        onChange={(e)=>setOldUser({...oldUser,password: e.target.value})} 
      />
      <Box sx={{textAlign:'right',my:1}}>
        <Typography variant='subtitle2' component={Link} color='primary' to={'/resetPassword'} sx={{textDecoration:'none'}}>
          forget password?
        </Typography>
      </Box>
      <Button onClick={()=>handleSignIn(oldUser)} variant='contained' fullWidth sx={{my:1}}>
        Sign In
      </Button>
      <Box sx={{textAlign:'center',my:1}}>
        <Typography variant='subtitle2' >
        Don't have an account?{" "}
        <Typography variant='subtitle2' component={Link} color='primary' to={'/register'} sx={{textDecoration:'none'}}>
          Sign Up
        </Typography>
        </Typography>
      </Box>
    </Paper>
    </Container>
  )
}

export default Login