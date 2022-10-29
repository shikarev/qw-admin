import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const StorageAndCatalog = () => {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Outlet />
    </Box>
  );
};

export default StorageAndCatalog;