import React from 'react';
import { Box } from '@mui/material';
import User from './User';


const Header = () =>
  <Box sx={{ p: 4, display: 'flex', alignItems: 'center', minHeight: '9rem', justifyContent: 'flex-end' }}>
    <User />
  </Box>;

export default Header;