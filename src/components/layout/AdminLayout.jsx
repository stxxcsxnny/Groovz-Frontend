import { Close, Menu, Dashboard, ManageAccounts, Message, Group, ExitToApp } from '@mui/icons-material';
import { Box, Drawer, Grid, IconButton, Stack, styled, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link as LinkComponent, Navigate, useNavigate } from 'react-router-dom';
import { adminLogout } from '../../redux/thunks/admin';

const StyledLink = styled(LinkComponent)`
  text-decoration: none;
  color: #000;
  border-radius: 5rem;
  padding: 1rem 2rem;
  &:hover {
    color: rgba(0,0,0,0.54);
  }
`;

const adminTabs = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: Dashboard,
  },
  {
    name: 'User',
    path: '/admin/users',
    icon: ManageAccounts,
  },
  {
    name: 'Chats',
    path: '/admin/chats',
    icon: Group,
  },
  {
    name: 'Messages',
    path: '/admin/messages',
    icon: Message,
  },
];

const Sidebar = ({ w = '100%' }) => {

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    dispatch(adminLogout());
    navigate('/admin');
  };
  return (
    <Stack width={w} direction={'column'} p={'3rem'} spacing={'3rem'} height={'100%'} sx={{ background: "radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)" }} >
      <Typography variant='h5' color='white' textTransform={'uppercase'} fontFamily={"Rubik Puddles"} borderBottom={'2px solid black'} textAlign={'center'} >Groovz</Typography>
      <Stack spacing={'1rem'}>
        {adminTabs.map((tab) => (
          <StyledLink
            key={tab.name}
            to={tab.path}
            style={{
              backgroundColor: location.pathname === tab.path ? 'black' : 'transparent',
              color: location.pathname === tab.path ? 'white' : 'inherit',
            }}
          >            <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
              <tab.icon />
              <Typography variant='body1'  >{tab.name}</Typography>
            </Stack>
          </StyledLink>
        ))}
        <StyledLink
          onClick={logoutHandler}

        >            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={'1rem'} marginTop={'5rem'}>
            <Tooltip title='Logout'><ExitToApp fontSize={'large'} /></Tooltip>
            <Typography variant='body1' ></Typography>
          </Stack>
        </StyledLink>
      </Stack>
    </Stack>
  );
};




const AdminLayout = ({ children }) => {
  const [mobile, setMobile] = useState(false);

  const { isAdmin, loading } = useSelector((state) => state.auth);

  if (loading) return <h1>Loading...</h1>; // or a spinner

  if (!isAdmin) return <Navigate to='/admin' />;

  const handleMobile = () => {
    setMobile(!mobile);
  };

  const handleClose = () => {
    setMobile(false);
  };


  return (
    <Grid container minHeight={'100vh'}  >
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },

          position: 'fixed',
          right: '3px',
          top: '1px',

        }}
      >
        <IconButton onClick={handleMobile} sx={{ color: 'white', }}>
          {mobile ? <Close sx={{ marginRight: '20px', }} /> : <Menu />}
        </IconButton>
      </Box>

      <Grid item md={4} lg={3} sx={{ backgroundColor: '#080808', display: { xs: 'none', md: 'block' } }}>
        <Sidebar />
      </Grid>

      <Grid item xs={12} md={8} lg={9} sx={{ backgroundColor: 'black', }}>
        {children}
      </Grid>

      <Drawer open={mobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
