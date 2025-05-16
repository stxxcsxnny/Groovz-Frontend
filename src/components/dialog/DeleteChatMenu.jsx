import { Delete, ExitToApp } from '@mui/icons-material';
import { Menu, Stack, Typography, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setisDeleteMenu } from '../../redux/reducer/misc';
import { useNavigate } from 'react-router-dom';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api';

const DeleteChatMenu = ({ patch, anchor }) => {
  const navigate = useNavigate();
    const { isDeleteMenu, selectedDeleteChat } = useSelector(state => state.misc)
    

 console.log(selectedDeleteChat)
  const closeHandler = () => {
    patch(setisDeleteMenu());
    };
    
    const [leaveGroup, { isSuccess: leaveSuccess }] = useLeaveGroupMutation();
    const [deleteChat, { isSuccess: deleteSuccess }] = useDeleteChatMutation();

    const deleteChatHandler = async () => {
      
    if (!selectedDeleteChat?.chatId) return;
    try {
      await deleteChat({ chatId: selectedDeleteChat.chatId }).unwrap();
      closeHandler();
      navigate('/');
    } catch (error) {
      console.error('Failed to delete chat', error);
    }
  };
    

   const isGroup = selectedDeleteChat?.groupChat

    const leaveGroupHandler = async () => {
       console.log("leave")
       if (!selectedDeleteChat?.chatId) return;
    try {
        await leaveGroup({ chatId: selectedDeleteChat.chatId }).unwrap();
        
      closeHandler();
      navigate('/');
    } catch (error) {
      console.error('Failed to leave group', error);
    }
    };

    useEffect(() => {
      if (deleteSuccess || leaveSuccess) {
        navigate('/');
      }
    }, [deleteSuccess, leaveSuccess, navigate]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={anchor}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      PaperProps={{
        sx: {
          borderRadius: 3,
          minWidth: 180,
              py: 0,
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(7, 24, 85, 0.04)',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              border : '1px solid rgba(255, 255, 255, 0.1)',
              
       
        }
      }}
    >
      <Box
        onClick={selectedDeleteChat?.groupChat ? leaveGroupHandler : deleteChatHandler}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 3,
          py: 0.5,
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          borderRadius: 2,
          '&:hover': {
              backgroundColor: 'action.hover',
              
          }
        }}
      >
        {selectedDeleteChat?.groupchat ? (
          <>
            <ExitToApp color="error" />
            <Typography variant="subtitle1" fontSize={"12px"} fontWeight={600}>
              Leave Group
            </Typography>
          </>
        ) : (
          <>
            <Delete color="error" />
            <Typography variant="subtitle1" fontSize={"12px"}fontWeight={600}>
              Delete Chat
            </Typography>
          </>
        )}
      </Box>
    </Menu>
  );
};

export default DeleteChatMenu;
