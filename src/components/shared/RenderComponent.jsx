import React from 'react';
import { transformImage } from '../../lib/Features';
import { FileOpen } from '@mui/icons-material';

const RenderComponent = ({ file, url }) => {
  const styles = {
    media: {
      maxWidth: '50%',
      height: 'auto',
    },
    container: {
      width: '100%',
      maxWidth: '200px', // Adjust maxWidth as needed
      margin: '0 auto',
    },
  };

  switch (file) {
    case 'video':
      return (
        <div style={styles.container}>
          <video src={url} preload="none" style={styles.media} controls></video>
        </div>
      );

    case 'image':
      return (
        <div style={styles.container}>
          <img
            src={transformImage(url, 200)}
            alt="Image Attachment"
            style={styles.media}
          />
        </div>
      );

    case 'audio':
      return (
        <div style={styles.container}>
          <audio src={url} preload="none" controls></audio>
        </div>
      );

    default:
      return <FileOpen />;
  }
};

export default RenderComponent;
