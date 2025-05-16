import { useInputValidation } from '6pp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { adminLogin, fetchAdmin } from '../../redux/thunks/admin';

const backgroundImg = 'https://t4.ftcdn.net/jpg/09/26/57/73/240_F_926577317_QLtRnGI88cU1PgpyWJAsb9vLkHfelMNn.jpg';



const AdminLogin = () => {
  const dispatch = useDispatch();
  const { isAdmin, loading } = useSelector((state) => state.auth);
  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(fetchAdmin()); // checks cookie & sets admin state on refresh
  }, [dispatch]);

  if (loading) return <h1>Loading...</h1>; // Prevent flicker on refresh
  if (isAdmin) return <Navigate to="/admin/dashboard" />;
  return (
    <div style={{
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <Container component={'main'} maxWidth='xs' sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(0,0,0,0.2)',
          width: '100%'
        }}>
          <Typography variant='h4' sx={{
            fontFamily: "Rubik Puddles",
            borderBottom: '1px solid black ',
            color: 'black',
            marginTop: '1rem',
            '&:hover': { color: 'blue' }
          }}>ADMIN LOGIN</Typography>
          <form style={{
            width: '90%',
            marginTop: '2rem',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }} onSubmit={submitHandler}>

            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '90%' }} >
              <VisibilityIcon sx={{ color: 'action.active', mr: 1, my: 1, width: '2rem', height: '2rem', opacity: '0.5' }} />
              <TextField required fullWidth label='Secret Key' margin='normal' variant='standard' type='password' value={secretKey.value} onChange={secretKey.changeHandler} />
            </Box>
            <Button sx={{ marginTop: '1rem', width: '80%', fontFamily: 'Rubik Puddles' }} variant='contained' color='primary' type='submit' fullWidth>Login</Button>

          </form>
        </div>
      </Container>
    </div>
  );
};

export default AdminLogin;
