import React from 'react'
import { Button, Container, Paper, Typography } from '@mui/material'

const Logout = () => {
  return (
    <Container maxWidth='sm'>
    <Paper elevation={5} sx={{p:3,my:5}}>
      <Typography variant='h6' color='error' align='center' sx={{my:2}}>
        Are you sure. Do you wanna logout?
      </Typography>
      <Button variant='contained' fullWidth sx={{my:2}}>
        Logout
      </Button>
    </Paper>
    </Container>
  )
}

export default Logout