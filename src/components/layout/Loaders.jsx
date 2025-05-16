export const LayoutLoader = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.blurContainer}>
        <div style={styles.mainContent}>
          {/* Chat List Skeleton */}
          <div style={styles.chatListContainer}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={styles.chatItem}>
                <div style={styles.avatarSkeleton}></div>
                <div style={styles.textSkeleton}></div>
              </div>
            ))}
          </div>

          {/* Chat Area Skeleton */}
          <div style={styles.chatContainer}>
            <div style={styles.centerBox}>
              <div style={styles.iconSkeleton}></div>
              <div style={styles.lineSkeleton}></div>
              <div style={styles.buttonSkeleton}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    width: "100%",
    height: "100vh",
    background: "#f5f5f5",
    position: "relative",
  },
  blurContainer: {
    width: "100%",
    height: "100%",
    backdropFilter: "blur(2px)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    width: "90%",
    height: "90%",
    display: "flex",
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
  },
  chatListContainer: {
    width: "25%",
    padding: "1rem",
    borderRight: "1px solid #eee",
    backgroundColor: "#f9f9f9",
    overflowY: "auto",
  },
  chatItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  avatarSkeleton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#ddd",
    marginRight: "0.8rem",
  },
  textSkeleton: {
    width: "60%",
    height: "14px",
    backgroundColor: "#e0e0e0",
    borderRadius: "6px",
  },
  chatContainer: {
    width: "75%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  centerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    backgroundColor: "#fafafa",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  },
  iconSkeleton: {
    width: "100px",
    height: "100px",
    borderRadius: "12px",
    backgroundColor: "#e0e0e0",
    marginBottom: "1.5rem",
  },
  lineSkeleton: {
    width: "160px",
    height: "14px",
    backgroundColor: "#ddd",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  buttonSkeleton: {
    width: "120px",
    height: "36px",
    backgroundColor: "#e0e0e0",
    borderRadius: "20px",
  },


};



import React from 'react';
import { Box, Typography, Stack, Fade } from '@mui/material';

export const TypingLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
        padding: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slight background to make it stand out
        borderRadius: '12px',
        boxShadow: 3,
        position: 'relative',
        width: '35px', // Set a fixed width for the loader box
        minHeight: '10px', // Minimum height for the loader box
      }}
    >

      {/* Dots Animation */}
      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
        {[1, 2, 3].map((dot, index) => (
          <Fade in={true} timeout={{ enter: 500, exit: 500 }} key={index} style={{ animationDelay: `${index * 300}ms` }}>
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: 'white',
                animation: 'dot-blink 1.5s infinite alternate',
                '@keyframes dot-blink': {
                  '0%': { opacity: 0 },
                  '50%': { opacity: 1 },
                  '100%': { opacity: 0 },
                },
              }}
            >
              .
            </Typography>
          </Fade>
        ))}
      </Stack>


    </Box>
  );
};





