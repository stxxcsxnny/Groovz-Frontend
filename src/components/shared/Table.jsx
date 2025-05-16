import { Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';



const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container sx={{ height: '100vh' }}>
      <Paper
        elevation={3}
        sx={{
          height: '90%',
          width: '100%',

          padding: '2rem 4rem',
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: 'none',
          margin: '2rem 0',

          backgroundColor: '#e9eef2'
        }}
      >
        <Typography
          textAlign={'center'}
          variant='h4'
          sx={{
            margin: '2rem',
            textTransform: 'uppercase',
            color: 'black',
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{
            height: '80%',
          }}
          sx={{
            border: 'none',

            '.table-header': {
              backgroundColor: 'black',
              color: 'white',
            },

          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
