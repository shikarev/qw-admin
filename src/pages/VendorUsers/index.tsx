import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const VendorUsers = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default VendorUsers;