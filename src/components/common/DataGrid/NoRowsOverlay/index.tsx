import React from 'react';
import {Box, Typography} from "@mui/material";

const NoRowsOverlay = ({title}:{title?: string}) => {
    return (
        <Box sx={{position: 'absolute', width: 1, top: '50%', display: 'flex', alignItems:'center', justifyContent: 'center'}}>
            <Typography variant='h2'>{title ?? 'Ничего нет'}</Typography>
        </Box>
    );
};

export default NoRowsOverlay;