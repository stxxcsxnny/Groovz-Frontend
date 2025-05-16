import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button } from '@mui/material';
import React from 'react';

function ConfirmDeleteDialog({ open, handleClose, deleteHandler }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this group?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteHandler} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
