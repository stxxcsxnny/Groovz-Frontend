import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import AppLayout from '../components/layout/AppLayout'

const Home = () => {
  const img1 = 'https://cdn-icons-png.flaticon.com/256/13709/13709369.png'
  return (

    <Grid container height={'100%'} justifyContent={'center'} alignItems={'center'} direction={'column'}>

      <Box height={'20%'} width={"sx:20% , md:30%"} borderRadius={'50%'}>
        <img src={img1} width={'100%'} height={'100%'} alt='img1' />
      </Box>
      <Typography color='grey' variant='caption'>Send a message to start a chat.</Typography>
      <button style={{
        backgroundColor: '#2196f3',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '10px'
      }}>Send message</button>

    </Grid>
  )
}

export default AppLayout()(Home)