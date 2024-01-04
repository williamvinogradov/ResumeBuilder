import React from 'react';
import { Button, Stack } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { resetDefaultData } from '../../../api';

export const HomePage: React.FC = () => {
  const onResetClickHandler = () => {
    resetDefaultData();
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '75vh' }}
    >
      <Button variant="contained" startIcon={<RestoreIcon />} onClick={onResetClickHandler}>
        Reset application data
      </Button>
    </Stack>
  );
};
