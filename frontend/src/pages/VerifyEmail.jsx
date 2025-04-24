import React from 'react'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'

const VerifyEmail = () => {
  return (
    <Container maxWidth='sm'>
    <Paper elevation={5} sx={{p:3,my:5}}>
      <Typography variant='h6' color='primary' align='center' sx={{my:2}}>
        Verify OTP
      </Typography>
      <TextField 
        label="OTP Number"
        type='number'
        fullWidth
        sx={{my:2}}
      />
      <Button variant='contained' fullWidth sx={{my:2}}>
        Email Verification
      </Button>
    </Paper>
    </Container>
  )
}


export default VerifyEmail