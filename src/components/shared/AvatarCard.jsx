import { Avatar, AvatarGroup, Box, Stack } from '@mui/material';
import React from 'react';

// Define a functional component called AvatarCard that takes in two props: avatar and max
const AvatarCard = ({ avatar = [], w,h  }) => {
  // Ensure avatar is always an array
  const avatars = Array.isArray(avatar) ? avatar : [avatar];

  return (
    // Return a Stack component with a row direction and a spacing of 0.2
    <Stack direction="row" spacing={0.2}>
      {/* Return an AvatarGroup component with a max prop and a sx prop to set the position to relative */}
      <AvatarGroup  sx={{ position: 'relative' }}>
        {/* Return a Box component with a width and height of 2rem */}
        <Box width="2rem" height="2rem">
          {/* Map over the avatars array and return an Avatar component for each item */}
          {avatars.map((i, index) => (
            <Avatar
              key={index}
              src={i}
              alt={`Avatar${index}`}
              style={{
                // Set the width, height, position, and left value for each Avatar component
                width: w||'2rem',
                height: h||'2rem',
                position: 'absolute',
                left: `${index * 0.1}rem`,
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
