import React from 'react'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'

const ResetPasswordVerify = () => {
  return (
    <Container maxWidth='sm'>
    <Paper elevation={5} sx={{p:3,my:5}}>
      <Typography variant='h6' color='primary' align='center' sx={{my:2}}>
        Change Password
      </Typography>
      <TextField 
        label="Email"
        type='email'
        fullWidth
        sx={{my:2}}
      />
      <TextField 
        label="OTP Number"
        type='number'
        fullWidth
        sx={{my:2}}
      />
      <TextField 
        label="New Password"
        type='password'
        fullWidth
        sx={{my:2}}
      />
      <Button variant='contained' fullWidth sx={{my:2}}>
        Verify OTP
      </Button>
    </Paper>
    </Container>
  )
}

export default ResetPasswordVerify