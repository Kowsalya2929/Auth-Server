import React from 'react'
import { Container, Typography } from '@mui/material'

const HomePage = () => {
  return (
    <Container maxWidth='md' sx={{my:5}}>
      <Typography variant='h6'>
        Hello , Guest 👋
      </Typography>
      <Typography variant='h6'>
        Welcome to our Auth web application
      </Typography>
    </Container>
  )
}

export default HomePage