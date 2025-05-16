import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import AvatarCard from './AvatarCard';
import { motion } from 'framer-motion';

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,

    
}) => {
   

  
    const chatItemStyles = {
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: sameSender ? 'rgb(0, 0, 0, 0.3)' : 'unset',
        color: sameSender ? 'white' : 'white',
        position: 'relative',
    };

    const avatarStyles = {
        width: '40px', // Customize if needed
        height: '40px', // Customize if needed
        borderRadius: '50%',
    };

    return (
        <Link
            style={{ paddingTop: '1', textDecoration: 'none' }}
            to={`/chat/${_id}`}
            onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={chatItemStyles}
            >
                <AvatarCard avatar={avatar} sx={avatarStyles} />

                <Stack>
                    <Typography
                        sx={{
                            fontSize: { xs: '0.6rem', sm: '0.6rem', md: '1rem', lg: '1rem' },
                            color: 'white',
                        }}
                    >
                        {name}
                    </Typography>

                    {newMessageAlert?.count > 0 && (
                        <Typography sx={{ fontSize: '0.6rem', color: 'gray' }}>
                            {newMessageAlert.count} New Message{newMessageAlert.count > 1 ? 's' : ''}
                        </Typography>
                    )}
                </Stack>
                

                {isOnline && (
  <Box
    sx={{
      width: { xs: '0.6rem', sm: '5px', md: '0.5rem', lg: '0.5rem'},
      height: { xs: '0.6rem', sm: '5px', md: '0.5rem', lg: '0.5rem' },
     backgroundColor: { xs: 'lightgreen', sm: 'aliceblue', md: 'transparent', lg: 'transparent' },
      borderRadius: '50%',
      border: '2px solid lightgreen',
      position: 'absolute',
      right: { xs: '1.6rem', sm: '0.5rem', md: '0.5rem', lg: '0.5rem' },
      top: { xs: '1rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
      
      transform: 'translateY(-50%)',
      boxShadow: '0 0 8px lightgreen',
    }}
  ></Box>
)}

            </motion.div>
        </Link>
    );
};

export default memo(ChatItem);

