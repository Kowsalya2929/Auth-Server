import React from 'react'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <Container maxWidth='sm'>
    <Paper elevation={5} sx={{p:3,my:5}}>
      <Typography variant='h6' color='primary' align='center'>
        Register
      </Typography>
      <TextField 
        label="Username"
        fullWidth
        sx={{my:1}}
      />
      <TextField 
        label="Email"
        type='email'
        fullWidth
        sx={{my:1}}
      />
      <TextField 
        label="Password"
        type='password'
        fullWidth
        sx={{my:1}}
      />
      <Button variant='contained' fullWidth sx={{my:1}}>
        Sign In
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