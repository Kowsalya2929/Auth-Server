import React, { useState } from 'react'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/auth.js'
import { toast, ToastContainer } from 'react-toastify'

const Register = () => {
  const [newUser,setNewUser] = useState({name:"",email:"",password:""})
  const {postRegister} = useAuthStore()
  const navigate = useNavigate()
  const handleSignUp = async(newUser)=>{
    const {success,message} = await postRegister(newUser)
    if(!success){
      toast.error(message,{position: 'top-right'})
    }else{
      toast.success(message,{position:'top-right'})
      setTimeout(() => {
        navigate('/')
      }, 3000);
      setNewUser({name:"",email:"",password:""})
    }
  }
  return (
    <Container maxWidth='sm'>
      <ToastContainer />
    <Paper elevation={5} sx={{p:3,my:5}}>
      <Typography variant='h6' color='primary' align='center'>
        Register
      </Typography>
      <TextField 
        label="Username"
        fullWidth
        sx={{my:1}}
        value={newUser?.name}
        onChange={(e)=>setNewUser({...newUser,name: e.target.value})}
      />
      <TextField 
        label="Email"
        type='email'
        fullWidth
        sx={{my:1}}
        value={newUser?.email}
        onChange={(e)=>setNewUser({...newUser,email: e.target.value})}
      />
      <TextField 
        label="Password"
        type='password'
        fullWidth
        sx={{my:1}}
        value={newUser?.password}
        onChange={(e)=>setNewUser({...newUser,password: e.target.value})}
      />
      <Button onClick={()=>handleSignUp(newUser)} variant='contained' fullWidth sx={{my:1}}>
        Sign Up
      </Button>
      <Box sx={{textAlign:'center',my:1}}>
        <Typography variant='subtitle2' >
        Already have an account?{" "}
        <Typography variant='subtitle2' component={Link} color='primary' to={'/login'} sx={{textDecoration:'none'}}>
          Sign In
        </Typography>
        </Typography>
      </Box>
    </Paper>
    </Container>
  )
}

export default Register