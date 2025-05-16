import { Email, ExpandLess, ExpandMore, Language, Phone } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FaceIcon from '@mui/icons-material/Face';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { transformImage } from '../../lib/Features/transformImage';
const ProfileDrawer = ({ open, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Backdrop
        open={open}
        onClick={onClose}
        sx={{
          zIndex: 1000,
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      />

      <Slide
        direction={isMobile ? 'up' : 'left'}
        in={open}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 500, exit: 300 }}
        easing={{ enter: 'cubic-bezier(0.4, 0, 0.2, 1)', exit: 'ease-in-out' }}
      >
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: 0,
            zIndex: 1200,
            width: isMobile ? '100%' : 400,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Paper
            elevation={10}
            sx={{
              flex: 1,
              borderRadius: 0,
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(23, 24, 60, 0.35), rgba(255,255,255,0.1))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.21)'
            }}
          >
            <Box sx={{ position: 'relative', px: 3, py: 4, textAlign: 'center' }}>
              <IconButton
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  top: 25,
                  left: 10,
                  color: 'white',


                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <Typography fontWeight={"bold"} color="white" fontSize={"16px"}
                sx={{
                  position: 'absolute',
                  top: 30,
                  left: 40

                }}
              >
                @{user?.username}
              </Typography>
              <Avatar
                src={transformImage(user?.avatar?.url || user?.avatar)}
                sx={{
                  width: isMobile ? 100 : 150,
                  height: isMobile ? 100 : 150,
                  margin: '80px auto', mb: 2
                }}
              />
              <Typography variant="h6" fontWeight="bold" color='white' >
                <FaceIcon />   {user?.name || 'No Name'}
              </Typography>

            </Box>

            <Divider />

            <Box sx={{ px: 3, py: 2 }}>

              <Typography variant="body1" mb={1}>
                {user?.bio || ''}
              </Typography>



              <Button
                onClick={() => setExpanded(!expanded)}
                endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
                fullWidth
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                {expanded ? 'Hide Contact Info' : 'Show Contact Info'}
              </Button>

              <Collapse in={expanded} timeout={{ enter: 400, exit: 300 }}>
                <Stack spacing={2} mt={2}>
                  {user?.email && (
                    <Box display="flex" alignItems="center">
                      <Email sx={{ mr: 1 }} />
                      <Typography variant="body2">{user.email}</Typography>
                    </Box>
                  )}
                  {user?.phone && (
                    <Box display="flex" alignItems="center">
                      <Phone sx={{ mr: 1 }} />
                      <Typography variant="body2">{user.phone}</Typography>
                    </Box>
                  )}
                  {user?.website && (
                    <Box display="flex" alignItems="center">
                      <Language sx={{ mr: 1 }} />
                      <Typography variant="body2">{user.website}</Typography>
                    </Box>
                  )}
                </Stack>
              </Collapse>
            </Box>
            <Box sx={{
              px: 3, py: 2,
              right: 0,
              bottom: 0,
              position: 'absolute',
              flexDirection: 'column',
              alignItems: 'center',

              display: 'flex',
            }}>

              <Divider />
              <Typography color='white ' fontSize={"10px"} sx={{
                left: 0,
                bottom: 10,
              }}>
                {moment(user?.createdAt).fromNow()}
              </Typography>
              <Typography color='rgb(255, 255, 255, 0.5)  ' fontSize={"8px"}>
                joined
              </Typography>
            </Box>

          </Paper>
        </Box>
      </Slide>
    </>
  );
};

export default ProfileDrawer;