import React, { useEffect } from 'react'
import { Container, Typography } from '@mui/material'
import useUserStore from '../store/user.js'

const HomePage = () => {
  const {users,getAllData} = useUserStore()
  useEffect(()=>{
    getAllData()
  },[getAllData])
  return (
    <Container maxWidth='md' sx={{my:5}}>
      {users.name ? 
        <Typography variant='h6'>
          Hello , {users.name} 👋
        </Typography>  : 
        <Typography variant='h6'>
          Hello , Guest 👋
        </Typography>
      }
      <Typography variant='h6'>
        Welcome to our Auth web application
      </Typography>
    </Container>
  )
}

export default HomePage