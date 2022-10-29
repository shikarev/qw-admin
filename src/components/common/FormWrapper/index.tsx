import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

const FormWrapper = ({children, title}:{children: any, title: string}) => {
  return (
    <Box sx={{backgroundColor: 'white', borderRadius: '3rem', '&:not(:last-child)': { marginBottom: '2.4rem' }}}>
      <Typography variant="h2" sx={{padding: '2.1rem 3.2rem'}}>
        {title}
      </Typography>
      <Divider variant="fullWidth" sx={{borderColor: 'secondary.main'}} />
      <Box sx={{padding: '2.4rem 3.2rem'}}>
        {children}
      </Box>
    </Box>
  );
};

export default FormWrapper;