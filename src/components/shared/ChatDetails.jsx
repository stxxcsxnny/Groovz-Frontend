import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  Drawer,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useMyChatsQuery } from '../../redux/api/api';

const FALLBACK_AVATAR = "https://res.cloudinary.com/djv6y4k4c/image/upload/v1688448397/avatars/defualt_avatar.png";

const ChatDetails = ({ chatId, open, handleClose }) => {
  const { isLoading, data } = useMyChatsQuery('');
  const isMobile = useMediaQuery('(max-width:600px)');

  if (isLoading) return null;

  const selectedChat = data?.chats?.find(chat => chat._id === chatId);

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : 400,
          height: isMobile ? '100%' : '100%',
          background: 'linear-gradient(135deg, rgba(1, 1, 22, 0.88), rgba(255,255,255,0.1))',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          color: 'white',
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center', position: 'relative' }}>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', left: 8, top: 8, color: 'white' }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <Avatar
          src={selectedChat?.avatar || FALLBACK_AVATAR}
          alt={selectedChat?.name}
          sx={{
            width: isMobile ? 100 : 120,
            height: isMobile ? 100 : 120,
            mx: 'auto',
            my: 4,
          }}
        />
        <Typography variant="h6" fontWeight="bold">
          {selectedChat?.name}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ px: 3, py: 2, height: '10rem' }}>
        <Typography variant="body1" mb={1}>
          Members
        </Typography>

        {selectedChat?.members?.map(member => (
          <Box
            key={member._id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              mb: 1,
            }}
          >
            <Avatar src={member.avatar || FALLBACK_AVATAR} alt={member.name || 'User'} />
            <Typography>{member.name || 'No Name'}</Typography>
          </Box>
        ))}
      </Box>

      <Divider />
    </Drawer>
  );
};

export default ChatDetails;
