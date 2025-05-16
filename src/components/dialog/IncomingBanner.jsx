import React from 'react';
import { Button, Card, CardContent, Typography, Box, Avatar, Stack } from '@mui/material';

const IncomingBanner = ({ caller = 'Unknown', onAccept, onDecline, avatar }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        bgcolor: 'rgba(0,0,0,0.6)',
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 6 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Stack alignItems="center" spacing={1}>
            {avatar && <Avatar src={avatar} sx={{ width: 56, height: 56 }} />}
            <Typography variant="h6">Incoming Call</Typography>
            <Typography variant="body2">{caller} is calling...</Typography>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={onAccept}>
              Accept
            </Button>
            <Button variant="outlined" color="secondary" onClick={onDecline}>
              Decline
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default IncomingBanner;
