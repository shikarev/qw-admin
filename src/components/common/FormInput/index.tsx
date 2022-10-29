import React from 'react';
import {Box, Typography} from '@mui/material';

const FormInput = ({children, label, req}: { children: any, label: string, req?: boolean }) => {
    return (
        <Box sx={{width: '100%', '&:not(:last-child)': {marginBottom: '2.4rem'}}}>
            <Typography
                variant='h6'
                sx={{marginBottom: '.8rem'}}
            >
                {label} {req && <Typography sx={{color: 'primary.main', fontSize: 'inherit', fontWeight: 'inherit'}}
                                    component={'span'}>*</Typography>}
            </Typography>
            {children}
        </Box>
    );
};

export default FormInput;