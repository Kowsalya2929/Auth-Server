import React from 'react'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'

const SendEmailVerify = () => {
  return (
    <Container maxWidth='sm'>
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
      <Button variant='contained' fullWidth sx={{my:2}}>
        Send OTP
      </Button>
    </Paper>
    </Container>
  )
}

export default SendEmailVerify