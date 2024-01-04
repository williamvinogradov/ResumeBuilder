import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export interface DeleteBlockDialogProps {
  open: boolean;
  title: string;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteBlockDialog: React.FC<DeleteBlockDialogProps> = ({
  open,
  title,
  confirmText,
  onClose,
  onConfirm,
}) => (
  <Dialog open={open}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Box sx={{ minWidth: 200 }}>Are you sure?</Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained" onClick={onConfirm}>
        {confirmText}
      </Button>
    </DialogActions>
  </Dialog>
);
