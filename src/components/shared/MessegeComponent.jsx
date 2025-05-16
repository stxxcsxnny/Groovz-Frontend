import { Box, Typography, Paper } from '@mui/material';
import React, { memo } from 'react';
import moment from 'moment';
import { fileFormat } from '../../lib/Features';
import RenderComponent from './RenderComponent';
import AvatarCard from './AvatarCard';
import { motion } from 'framer-motion';

const MessegeComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = String(sender?._id) === String(user?._id);

  



  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div

      initial={{ opacity: 0, x: sameSender ? '10%' : '-10%' }}
      whileInView={{ opacity: 1, x: 0 }}

    >
      <Box
        display="flex"
        flexDirection={sameSender ? 'row-reverse' : 'row'}
        alignItems="flex-end"
        marginY={1.2}
        paddingX={1}
      >
        {/* Render sender's avatar if it's not the same user */}
        {!sameSender && (
          <Box marginRight={1}>
            <AvatarCard avatar={sender.avatar} />
          </Box>
        )}

        <Paper
          elevation={3}
          sx={{
            backgroundColor: sameSender ? '#2a64d1' : '#2f3542',
            color: '#ffffff',
            padding: '0.9rem 1.2rem',
            borderRadius: '20px',
            borderBottomRightRadius: sameSender ? '5px' : '20px',
            borderBottomLeftRadius: sameSender ? '20px' : '5px',
            maxWidth: { xs:'auto',lg:'65%'},
            display: 'flex',
            flexDirection: 'column',
          
            position: 'relative',
          }}
        >
          {/* If sender is different, show their name */}
          {!sameSender && (
            <Typography
              fontSize={{xs:"0.4rem" ,lg : '0.6rem'}}
              fontWeight={100}
              color="#d1d1d1"
              marginBottom="0.1rem"
            >
              {sender.name}
            </Typography>
          )}

          {/* Display content if available */}
          {content && (
            <Typography
              fontSize={{xs:"0.7rem" ,lg : '0.9rem'}}
              fontWeight={{xs:"400" ,lg : '600'}}
              
              lineHeight={1.4}
              sx={{ wordBreak: 'break-word' }}
            >
              {content}
            </Typography>
          )}

          {/* Render attachments if available */}
          {attachments.length > 0 && (
            <Box display="flex" flexDirection="column" gap="0.5rem">
              {attachments.map((attachment, index) => {
                const url = attachment.url;
                const file = fileFormat(url);
                return (
                  <Box key={index}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      style={{ color: '#aad2ff', textDecoration: 'underline' }}
                    >
                      <RenderComponent file={file} url={url} />
                    </a>
                  </Box>
                );
              })}
            </Box>
          )}

          {/* Display time ago */}
          <Typography
            variant="caption"
            fontSize={{xs:"0.4rem" ,lg : '0.6rem'}}
            color="#b0b0b0"
            textAlign="right"
          >
            {timeAgo}
          </Typography>
        </Paper>
      </Box>

    </motion.div>
  )
};

export default memo(MessegeComponent);
