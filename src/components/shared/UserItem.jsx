import {
  Check as CheckIcon,
  Add as AddIcon,
  WavingHandTwoTone,
  Diversity2Sharp,
  Diversity3Outlined
} from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  ListItem,
  Stack,
  Typography
} from '@mui/material';
import React, { memo } from 'react';

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isSelected = false,
  style = {},
  showAddIcon = false, // true only for "Add Member" screen
}) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem>
      <Stack direction="row" alignItems="center" spacing="1rem" width="100%" {...style}>
        <Avatar src={typeof avatar === 'string' ? avatar : avatar?.url} alt={name} />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </Typography>

        <IconButton
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
          size="small"
          sx={{
            backgroundColor: isSelected ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.1)",
            color: "white",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            '&:hover': {
              backgroundColor: isSelected ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          {isSelected ? <Diversity3Outlined/> : showAddIcon ? <AddIcon /> : <WavingHandTwoTone />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
