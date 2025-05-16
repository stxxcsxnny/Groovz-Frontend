import { useInputValidation } from '6pp';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAvailableFriendsQuery, useNewGroupapiMutation } from '../../redux/api/api';
import UserItem from '../shared/UserItem';


const NewGroupDialog = () => {
  const groupname = useInputValidation('');
  const [SelectMembers, setSelectMembers] = useState([]);



  const { isError, isLoading, error, data } = useAvailableFriendsQuery({});
  const [newGroup] = useNewGroupapiMutation();
  const [open, setOpen] = useState(true); // dialog starts open


  const selectMemberHandler = (id) => {
    setSelectMembers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const submitHandler = async () => {
    // Validate group name and members
    if (groupname.value.trim() === '') {
      toast.error('Group name is required');
      return; // Prevent further execution if validation fails
    } else if (SelectMembers.length < 2) {
      toast.error('At least 2 members are required');
      return; // Prevent further execution if validation fails
    }

    // Call newGroup and await its response if it's async
    try {
      const response = await newGroup({
        name: groupname.value,
        members: SelectMembers,
      });

      closeDialog();

    }
    catch (error) {
      toast.error(error.message);
    }
  };




  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '1rem',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',

          width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
          
        },
      }}
    >
      <Stack spacing={3} p={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <DialogTitle sx={{ color: 'white', fontSize: '1.5rem', padding: 0 }}>
            New Group
          </DialogTitle>
        </Stack>

        <TextField
          label="Group Name"
          value={groupname.value}
          onChange={groupname.changeHandler}
          fullWidth
          variant="outlined"
          sx={{
            input: { color: 'white' },
            label: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.8rem',
              backgroundColor: 'rgba(255,255,255,0.2)',
              '& fieldset': { border: 'none' },
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)',
              },
            },
          }}
        />

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <Typography variant="subtitle1" color="white">Add Members</Typography>

        {isLoading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 4 }}>
            <CircularProgress sx={{ color: 'white' }} />
          </Stack>
        ) : (
          <Stack spacing={1} maxHeight="200px" overflow="auto" pr={1}>
            {data?.friends && data.friends.length > 0 ? (
              data.friends.map((user, index) => (
                <UserItem
                  key={`${user._id}-${index}`}
                  user={user}
                  handler={selectMemberHandler}
                  isSelected={SelectMembers.includes(user._id)}
                />
              ))
            ) : (
              <Typography color="white">No friends available</Typography>
            )}
          </Stack>
        )}

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button onClick={closeDialog} sx={{ color: 'white', border: '1px solid rgba(255, 255, 255, 0.3)' ,borderRadius: '0.8rem' }}>
            Cancel
          </Button>
          <Button onClick={submitHandler} variant="contained" sx={{ background: 'rgba(255,255,255,0.2)', color: 'white' ,borderRadius: '0.8rem'}}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
export default NewGroupDialog;