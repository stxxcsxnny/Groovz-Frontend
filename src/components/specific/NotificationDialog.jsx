import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  ListItem,
  Stack,
  Typography
} from '@mui/material';
import React, { memo } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useErrors from '../../../hooks/hook';
import { useAcceptFriendRequestMutation, useGetNotificationQuery } from '../../redux/api/api';
import { setisNotification } from '../../redux/reducer/misc';

const NotificationDialog = ({ _id, accept }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isNotification } = useSelector((state) => state.misc);


  const { isLoading, data, error, isError } = useGetNotificationQuery()

  const [acceptRequest] = useAcceptFriendRequestMutation()

  const friendRequestHandler = async ({ _id, accept }) => {
    try {

      const res = await acceptRequest({ requestId: _id, accept })
    
      if (res.data?.success) {
       
        toast.success(res.data?.message)
      } else toast.error(res.data?.message || "Something went wrong")

    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)

    }

  };

  const closeHandler = () => {
    dispatch(setisNotification(false));
  }

  useErrors([{ error, isError }])





  return (
    <Dialog open={isNotification} onClose={closeHandler} maxWidth="sm" fullWidth PaperProps={{
      sx: {
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
      },
      sx: {
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
      },
    }}>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <DialogTitle sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Notifications
        </DialogTitle>

      </Stack>

      <Divider sx={{ backgroundColor: '#333', mb: 2 }} />

      <Stack spacing={2}

        sx={
          {
            maxHeight: '400px',
            overflowY: 'auto',

          }
        }
      >
        {data?.allRequests.length > 0 ? (
          data?.allRequests?.map((item) => (
            <NotificationItem key={item._id} {...item} handler={friendRequestHandler} />
          ))
        ) : (
          <Typography color="gray" textAlign="center">
            No Notifications
          </Typography>
        )}
      </Stack>

    </Dialog>
  );
};

const NotificationItem = ({ sender, _id, handler }) => {
  const { name } = sender;

  return (
    <ListItem
      sx={{
        backgroundColor: '#2b2d31',
        borderRadius: 2,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: '#fff',
          fontWeight: 500,
          wordBreak: 'break-word',
        }}
      >
        {name} sent you a friend request
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        justifyContent="flex-end"
      >
        <Button
          onClick={() => handler({ _id, accept: true })}
          variant="contained"
          size="small"
          sx={{
            backgroundColor: '#2a64d1',
            color: '#fff',
            '&:hover': { backgroundColor: '#3b7af3' },
            borderRadius: '20px',
            textTransform: 'none',
          }}
        >
          Accept
        </Button>
        <Button
          onClick={() => handler({ _id, accept: false })}
          variant="outlined"
          size="small"
          sx={{
            color: 'gray',
            borderColor: 'gray',
            '&:hover': {
              borderColor: '#e53935',
              color: '#e53935',
            },
            borderRadius: '20px',
            textTransform: 'none',
          }}
        >
          Reject
        </Button>
      </Stack>
    </ListItem>
  );
};

export default memo(NotificationDialog);
